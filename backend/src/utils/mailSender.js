const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async (to, subject, otp) => { // Fix parameter order
  try {
    const info = await transporter.sendMail({
      from: `Study-Notion, ${process.env.MAIL_USER}`, // sender address
      to, // list of receivers
      subject, // Subject line
      html: `<h1>${otp}</h1>`, 
    });
    console.log('Email sent: ', info.response);
    return info; // Return the email response info
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

module.exports = { sendEmail };
