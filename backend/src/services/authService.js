const User = require("../models/userModel");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../models/profileModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  CustomError,
  AuthenticationError,
  DatabaseError,
} = require("../utils/CustomError");

const sendOtpService = async (email) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new DatabaseError("User already exists", 400);
  }

  let otp;
  let result;
  do {
    otp = otpGenerator.generate(6, {
      digits: true,
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });
    result = await OTP.findOne({ otp });
  } while (result);

  await OTP.create({ email, otp });
  return { status: 200, msg: "OTP sent successfully", success: true };
};

const signupService = async ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  accountType,
  contactNumber,
  otp,
}) => {
  if (password !== confirmPassword) {
    throw new AuthenticationError(
      "Password and Confirm Password do not match",
      400
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AuthenticationError(
      "User already exists. Please sign in to continue.",
      400
    );
  }

  const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
  if (response.length === 0 || otp !== response[0].otp) {
    throw new DatabaseError("The OTP is not valid", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const profileDetails = await Profile.create({
    gender: null,
    dateOfBirth: null,
    about: null,
    contactNumber: contactNumber || null,
  });

  const user = await User.create({
    firstName,
    lastName,
    email,
    contactNumber,
    password: hashedPassword,
    accountType,
    addionalDetails: profileDetails._id,
    image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
  });

  return {
    status: 200,
    msg: "User registered successfully",
    success: true,
    user,
  };
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AuthenticationError("User not found.", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AuthenticationError("Invalid credentials", 400);
  }

  const payload = {
    id: user._id,
    email: user.email,
    accountType: user.accountType,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

  user.password = undefined;

  return {
    status: 200,
    msg: "Logged in successfully",
    success: true,
    token,
    user,
  };
};

module.exports = { sendOtpService, signupService, loginService };
