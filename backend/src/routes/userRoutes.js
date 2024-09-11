// src/routes/userRoute.js
const express = require("express");
const {
  signupController,
  loginController,
  sendOtpController,
} = require("../controllers/auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/resetPassword");
const { auth } = require("../middlewares/auth");
const validate = require("../middlewares/validation");
const {
  sendOtpSchema,
  signupSchema,
  loginSchema,
  resetPasswordTokenSchema,
  resetPasswordSchema,
} = require("../validation/schemas");
// const { sendOtpLimiter, signupLimiter, loginLimiter, resetPasswordLimiter } = require('../middlewares/rateLimiter');
const {
  sendOtpLimiter,
  generalRateLimiter,
  sensitiveRateLimiter,
} = require("../middlewares/rateLImiter");
const router = express.Router();

// Authentication routes
router.post(
  "/sendOtp",
  sendOtpLimiter,
  validate(sendOtpSchema),
  sendOtpController
);
router.post(
  "/signup",
  generalRateLimiter,
  validate(signupSchema),
  signupController
);
router.post(
  "/login",
  sensitiveRateLimiter,
  validate(loginSchema),
  loginController
);

// Reset password routes
router.post(
  "/reset-password-token",
  sensitiveRateLimiter,
  validate(resetPasswordTokenSchema),
  resetPasswordToken
);
router.post(
  "/reset-password",
  sensitiveRateLimiter,
  validate(resetPasswordSchema),
  resetPassword
);

module.exports = router;
