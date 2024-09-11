const Category = require("../models/Category");
const Course = require("../models/courseModel");
const {CustomError,DatabaseError,AuthenticationError} = require("../utils/CustomError");

const createCategoryService = async ({ name, description }) => {
  try {
    const CategoryDetail = await Category.create({ name, description });
    return {
      status: 200,
      msg: "Category created successfully",
      success: true,
      CategoryDetail,
    };
  } catch (error) {
    throw new CustomError("Error creating Category", 500);
  }
};

const showAllCategoryService = async () => {
  try {
    const allCategory = await Category.find({}, { name: true, description: true });
    return {
      status: 200,
      msg: "All Categories fetched successfully",
      success: true,
      allCategory,
    };
  } catch (error) {
    throw new CustomError("Error fetching Category", 500);
  }
};

const categoryPageDetailsService = async (categoryId) => {
  try {
    const relatedCourses = await Category.findById(categoryId).populate("course").exec();
    if (!relatedCourses) {
      throw new DatabaseError("Category not found", 404);
    }

    const otherCourses = await Course.find({ category: { $ne: categoryId } }).limit(10);
    const topSellingCourses = await Course.find({}).sort({ sales: -1 }).limit(10);

    return {
      status: 200,
      relatedCourses,
      otherCourses,
      topSellingCourses,
      success: true,
    };
  } catch (error) {
    throw new CustomError("Error fetching category page details", 500);
  }
};

module.exports = {
  createCategoryService,
  showAllCategoryService,
  categoryPageDetailsService,
};
