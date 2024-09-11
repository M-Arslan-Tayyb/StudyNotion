module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err)); // Forward any error to the error handling middleware
  };
};
