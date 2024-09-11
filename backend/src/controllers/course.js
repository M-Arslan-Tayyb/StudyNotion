const { createCourseService, showAllCoursesService, showCourseDetailsService } = require("../services/courseService");

const createCourse = async (req, res, next) => {
  try {
    const { courseName, courseDescription, whatWillYouLearn, price, categoryIds, tags } = req.body;
    const thumbnail = req.files.thumbnail;
    const userId = req.user.id;

    const result = await createCourseService({ courseName, courseDescription, whatWillYouLearn, price, categoryIds, tags }, userId, thumbnail);

    return res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

const showAllCourse = async (req, res, next) => {
  try {
    const result = await showAllCoursesService();
    return res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

const getCourseDetails = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const result = await showCourseDetailsService(courseId);

    return res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCourse, showAllCourse, getCourseDetails };
