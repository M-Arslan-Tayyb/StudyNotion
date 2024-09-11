// errorHandler.js
const { CustomError } = require('../utils/CustomError');

const errorHandler = (err, req, res, next) => {

    //operational errors
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  //programming error
  console.error('Unexpected Error:', err); // Log the error for internal use
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error', // Generic message for unexpected errors
  });
};

module.exports = errorHandler;
