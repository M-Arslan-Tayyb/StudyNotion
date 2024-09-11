// src/middlewares/loggerService.js
const logger = require('../config/logger');

const logRequest = (req, res, next) => {
  const logObject = {
    method: req.method,
    url: req.url,
    status: res.statusCode,
    responseTime: res.responseTime,
  };
  logger.info(JSON.stringify(logObject));
  next();
};

module.exports = {
  logRequest,
};
