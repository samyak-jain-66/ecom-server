const Address = require("../models/Address");
const mongoose = require("mongoose");

const GetAddresses = async (req, res) => {
  const userId = req.params.userid;
  try {
    const address = await Address.find({ userId });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetAddress = async (req, res) => {
  const userId = req.params.userid;
  const addressId = req.query.addressid;

  try {
    const address = await Address.find(
      {
        userId: userId,
        "addresses._id": addressId,
      },
      {
        addresses: {
          $elemMatch: {
            _id: mongoose.Types.ObjectId(addressId),
          },
        },
      }
    );
    return res.status(200).json(address);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const CreateAddress = async (req, res) => {
  const userId = req.params.userid;
  const addressData = req.body;
  const existingUserAddress = await Address.findOne({ userId });
  if (existingUserAddress) {
    // Update Address
    try {
      const updatedAddress = await Address.findOneAndUpdate(
        { userId: userId },
        { $push: { addresses: addressData } },
        { returnOriginal: false }
      );
      return res.status(201).json(updatedAddress);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    const newAddress = new Address({
      userId,
      addresses: [{ ...addressData }],
    });
    try {
      const savedAddress = await newAddress.save();
      res.status(201).json(savedAddress);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

const DeleteAddress = async (req, res) => {
  const userid = req.params.userid;
  const addressId = req.query.addressid;

  try {
    const address = await Address.find(
      {
        userId: userid,
        "addresses._id": addressId,
      },
      {
        addresses: {
          $elemMatch: {
            _id: mongoose.Types.ObjectId(addressId),
          },
        },
      }
    );
    if (!address) return res.status(404).json({ message: "Address not found" });
    const updatedAddress = await Address.update(
      {
        userId: userid,
      },
      {
        $pull: {
          addresses: {
            _id: mongoose.Types.ObjectId(addressId),
          },
        },
      }
    );
    return res.status(200).json(updatedAddress);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { GetAddresses, GetAddress, CreateAddress, DeleteAddress };
