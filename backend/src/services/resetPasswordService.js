const User = require("../models/userModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/mailSender");
const { CustomError, AuthenticationError, DatabaseError } = require('../utils/CustomError');

const generateResetPasswordToken_Service = async (email) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("User not found, register first", 404);
    }

    // Generate a token and save it in the user's database
    const token = crypto.randomUUID();
    await User.findOneAndUpdate(
      { email },
      { token, resetPasswordExpiration: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );

    const url = `http://localhost:5173/update-password/${token}`;

    // Send the reset password link to the user's email
    await sendEmail(email, "Reset Password", `Password reset link: ${url}`);

    return { success: true, msg: "Reset Password link sent successfully" };
  } catch (e) {
    if (e instanceof CustomError) {
      throw e;
    }
    throw new DatabaseError("Error generating reset password token", 500);
  }
};

const resetPassword_Service = async (token, password, confirmPassword) => {
  try {
    // Validate the data
    if (!password || !confirmPassword) {
      throw new CustomError("All fields are required", 400);
    }
    if (password !== confirmPassword) {
      throw new CustomError("Passwords do not match", 400);
    }

    // Find the user by token and update the password
    const user = await User.findOne({ token });
    if (!user) {
      throw new CustomError("Token is invalid", 404);
    }

    // Check if the token has expired
    if (user.resetPasswordExpiration < Date.now()) {
      throw new CustomError("Token is expired", 400);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password
    await User.findOneAndUpdate(
      { token },
      { password: hashedPassword },
      { new: true }
    );

    return { success: true, msg: "Password updated successfully" };
  } catch (e) {
    if (e instanceof CustomError) {
      throw e;
    }
    throw new DatabaseError("Problem updating password", 500);
  }
};

module.exports = { generateResetPasswordToken_Service, resetPassword_Service };
