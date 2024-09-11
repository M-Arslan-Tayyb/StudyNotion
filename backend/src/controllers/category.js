const {
  createCategoryService,
  showAllCategoryService,
  categoryPageDetailsService,
} = require("../services/categoryService");

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const result = await createCategoryService({ name, description });
    return res.status(result.status).json(result);
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

const showAllCategory = async (req, res, next) => {
  try {
    const result = await showAllCategoryService();
    return res.status(result.status).json(result);
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

const categoryPageDetails = async (req, res, next) => {
  const { categoryId } = req.body;
  try {
    const response = await categoryPageDetailsService(categoryId);
    return res.status(response.status).json(response);
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

module.exports = {
  createCategory,
  showAllCategory,
  categoryPageDetails,
};
