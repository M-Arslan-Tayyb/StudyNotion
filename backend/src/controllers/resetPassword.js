//main work:
//our main work is to create an front end link with a token of every user with expiry, and then on this link we will reset the password
//so we have 2 modules 1 is resetPassword token generate and send an link to user mail
// 2nd is resetPassword
const { generateResetPasswordToken_Service, resetPassword_Service } = require("../services/resetPasswordService");


const resetPasswordToken = async (req, res, next) => {
  try {
    // Fetch the data, like: email
    const { email } = req.body;

    // Call the service function
    const result = await generateResetPasswordToken_Service(email);

    if (!result.success) {
      return res.status(result.statusCode).json(result);
    }

    res.status(200).json(result);
  } catch (e) {
    next(e); // Pass the error to the global error handler
  }
};

const resetPassword = async (req, res, next) => {
  try {
    // Fetch the data: token, password, confirmPassword
    const { password, confirmPassword, token } = req.body;

    // Call the service function
    const result = await resetPassword_Service(token, password, confirmPassword);

    if (!result.success) {
      return res.status(result.statusCode).json(result);
    }

    res.status(200).json(result);
  } catch (e) {
    next(e); // Pass the error to the global error handler
  }
};

module.exports = { resetPasswordToken, resetPassword };
