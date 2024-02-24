require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post('/send-email', (req, res) => {
  const { name, swimmerName, email, message } = req.body;
  
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.HEAD_COACH_EMAIL, // Replace with the head coach's email
    subject: `New message from ${name}`,
    text: `Message from ${name} (${email}), for swimmer ${swimmerName}: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email', error);
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
