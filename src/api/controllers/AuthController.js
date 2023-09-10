const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { service } = require('../axios');
const { GET_WELCOME_EMAIL_TEMPLATE } = require('../../constants/constant');

const RegisterUser = async (req, res) => {
  // Check if user already exists
  const email = req.body.email;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json('User already exist');
  }
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();

    const emailContent = {
      name: req.body.firstname + ' ' + req.body.lastname,
      email: req.body.email,
      template: GET_WELCOME_EMAIL_TEMPLATE(
        req.body.firstname + ' ' + req.body.lastname
      ),
    };

    const token = jwt.sign(
      {
        id: savedUser._id,
        isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    try {
      const sendEmail = await service.post(
        '/mail/send/' + savedUser._id,
        emailContent,
        {
          headers: {
            token: 'Bearer ' + token,
          },
        }
      );
    } catch (error) {
      return res.status(500).json(error);
    }
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const LoginUser = async (req, res) => {
  try {
    // Find user in database with the provided email address
    const user = await User.findOne({ email: req.body.email });

    // If user not found change status and return
    if (!user) res.status(401).json('Invalid email or password');

    // Else take password from DB and decrypt to compare with entered password
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );

    // Authenticity
    const passwordInString = decryptedPassword.toString(CryptoJS.enc.Utf8);
    if (passwordInString !== req.body.password)
      return res.status(401).json('Invalid email or password');

    // If email and password both correct generate JWT (Authorization) and login user
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Sending user details and token excluding password
    const { password, ...info } = user._doc;
    return res.status(200).json({ info, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { RegisterUser, LoginUser };
