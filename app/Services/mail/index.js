const nodemailer = require("nodemailer");
const mustache = require("mustache");
const fs = require("fs");
const { gmail, gmailPass } = require("../../Configs");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: gmail,
    pass: gmailPass,
  },
});

const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/Services/mail/views/otp.html", "utf-8");

    let message = {
      from: gmail,
      to: email,
      subject: "Activate your account!",
      html: mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { otpMail };
