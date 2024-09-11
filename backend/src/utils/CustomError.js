class CustomError extends Error {
  // Error is extends from other source
  //this constructor will called when an new object is created
  constructor(message, statusCode) {
    super(message); //calling the constructor of Error class

    this.statusCode = statusCode;

    this.isOperational = true; // we only want to send operational errors, and we don't want other errors like programming or other bugs

    Error.captureStackTrace(this, this.constructor); // this will add a stack trace to the error object, where the error is occurred
  }
}

// authenticationError.js
class AuthenticationError extends CustomError {
  constructor(message, statusCode) {
    super(message || "Authentication failed");
    this.statusCode = statusCode || 401; // 401 Unauthorized
  }
}

// databaseError.js
class DatabaseError extends CustomError {
  constructor(message, statusCode) {
    super(message || "Database error"); // 500 Internal Server Error
    this.statusCode = statusCode || 500; // 500 Internal Server Error
  }
}

module.exports = { CustomError, AuthenticationError, DatabaseError };
