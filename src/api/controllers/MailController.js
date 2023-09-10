const nodemailer = require("nodemailer");

const SendMail = async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net", // SMTP Server
    port: 587,
    secure: false,
    auth: {
      user: "apikey",
      pass: process.env.SEND_GRID_API,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: `"eCommerce Support" <${process.env.SEND_MAIL_ID}>`, // sender address
      to: req.body.email, // list of receivers
      subject: req.body.template.subject,
      html: req.body.template.content,
    });
    return res.status(201).json(info);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { SendMail };
