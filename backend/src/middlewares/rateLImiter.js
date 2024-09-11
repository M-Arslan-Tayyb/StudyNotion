const rateLimit = require("express-rate-limit");

// Rate limiter for sendOtp route
const sendOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message:
    "Too many OTP requests from this IP, please try again after 15 minutes",
    headers: true, 
    
});



const generalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    headers: true, // Adds rate limit info to response headers
  });
  
  // Specific Rate Limiter for Sensitive Routes
  const sensitiveRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 5,
    message: 'Too many attempts, please try again after 10 minutes',
    headers: true,
  });
module.exports = {
  sendOtpLimiter,
  sensitiveRateLimiter,
  generalRateLimiter,
 
  
};
