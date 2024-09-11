const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload, expiresIn = '2h') => {
    const token = jwt.sign(payload, "arslan776", { expiresIn });
    console.log("Generated token: ", token); 
    return token;
  };
  
module.exports = { generateToken };
