const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'ninhconglucit@outlook.com',
    pass: '123@123abZ',
  },
});

module.exports = transporter;
