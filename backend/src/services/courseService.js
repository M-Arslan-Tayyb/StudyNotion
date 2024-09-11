const { CustomError, DatabaseError } = require('../utils/CustomError');
const User = require("../models/userModel");
const Category = require("../models/Category");
const Course = require("../models/courseModel");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

const createCourseService = async (courseData, userId, thumbnail) => {
  try {
    const { courseName, courseDescription, whatWillYouLearn, price, categoryIds, tags } = courseData;

    const instructorDetails = await User.findById(userId);
    if (!instructorDetails) {
      throw new CustomError("Instructor not found", 404);
    }

    const categoryDetails = await Category.find({ _id: { $in: categoryIds } });
    if (!categoryDetails || categoryDetails.length === 0) {
      throw new CustomError("Category not found", 404);
    }

    const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

    const newCourse = new Course({
      courseName,
      courseDescription,
      whatWillYouLearn,
      price,
      thumbnail: thumbnailImage.secure_url,
      Instructor: instructorDetails._id,
      Category: categoryDetails.map(category => category._id),
      tags: tags,
    });

    await newCourse.save();

    await User.findByIdAndUpdate(
      instructorDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    await Category.updateMany(
      { _id: { $in: categoryIds } },
      { $push: { course: newCourse._id } }
    );

    return { status: 201, msg: "Course created successfully", success: true, course: newCourse };
  } catch (error) {
    throw new DatabaseError(error.message || "Error creating course", 500);
  }
};

const showCourseDetailsService = async (courseId) => {
  try {
    const response = await Course.findById(courseId)
      .populate("Instructor")
      .populate("Category")
      .populate({
        path: "courseContent",
        populate: {
          path: "Section",
          select: "sectionName",
        },
        populate: {
          path: "subSection",
          select: "title timeDuration description videoFile",
        },
      }).exec();

    if (!response) {
      throw new CustomError("Course not found", 404);
    }

    return { status: 200, msg: "Course fetched successfully", success: true, course: response };
  } catch (error) {
    throw new DatabaseError(error.message || "Error fetching course details", 500);
  }
};

const showAllCoursesService = async () => {
  try {
    const courses = await Course.find({}, {
      courseName: true,
      price: true,
      thumbnail: true,
      Instructor: true,
      studentEnrolled: true,
      rattingAndReviewer: true,
    }).populate("Instructor").exec();

    return { status: 200, msg: "All courses fetched successfully", success: true, courses };
  } catch (error) {
    throw new DatabaseError(error.message || "Error fetching courses", 500);
  }
};

module.exports = { createCourseService, showAllCoursesService, showCourseDetailsService };
