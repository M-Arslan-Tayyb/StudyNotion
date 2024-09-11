const asyncErrorHandler = require("../utils/asyncErrorHandler");
const {
  sendOtpService,
  signupService,
  loginService,
} = require("../services/authService");

const sendOtpController = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  const response = await sendOtpService(email);
  return res.status(response.status).json(response);
});

const signupController = asyncErrorHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    contactNumber,
    otp,
  } = req.body;
  const response = await signupService({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    contactNumber,
    otp,
  });
  return res.status(response.status).json(response);
});

const loginController = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const response = await loginService({ email, password });
  return res.status(response.status).json(response);
});

module.exports = { sendOtpController, signupController, loginController };
