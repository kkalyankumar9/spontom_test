const express = require('express');
const { UserModel } = require('../models/userModel');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  auth: {
    user: 'kkalyan2312@gmail.com',
    pass: process.env.PASSWORD // Use the generated app password here
  }
});

const forgotPasswordRoute = express.Router();

// Route to request a password reset
forgotPasswordRoute.post('/forgot_password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    // Set expiration time for the token (e.g., 1 hour)
    const resetTokenExpiration = Date.now() + 3600000;

    // Include token in the email body
    const mailOptions = {
      from: 'kkalyan2312@gmail.com',
      to: user.email,
      subject: 'Password Reset',
      text: ` Reset your password through this token:${token}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).send({ msg: 'Email sent successfully', token, email });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Internal server error' });
  }
});

// Route to handle password reset
forgotPasswordRoute.patch('/reset_password', async (req, res) => {
  const { token, newPassword, email } = req.body;

  try {
    // Now you can proceed to update the user password
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    // Ensure newPassword is defined before hashing
    if (!newPassword) {
      return res.status(400).send({ msg: 'New password is required' });
    }

    if (validatePassword(newPassword)) {
      // Hash the new password before saving it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      await user.save(); // Save the updated user password

      return res.status(200).send({ msg: 'Password reset successfully' });
    } else {
      res.status(400).send({
        msg: "Password must meet the following criteria:",
        requirements: {
          length: "At least 8 characters",
          uppercase: "At least one uppercase letter (A-Z)",
          digit: "At least one digit (0-9)",
          specialCharacter:
            "At least one special character (!@#$%^&*()_+{}[]:;<>,.?~)",
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Internal server error' });
  }
});

function validatePassword(password) {
  const pattern =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.{8,})/;

  return pattern.test(password);
}

module.exports = { forgotPasswordRoute };
