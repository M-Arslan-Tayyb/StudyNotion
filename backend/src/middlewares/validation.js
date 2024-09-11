const Joi = require('joi');

const validate = (schema) => (req, res, next) => {//receiving schema
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message, success: false });
  }
  next();
};

module.exports = validate;
