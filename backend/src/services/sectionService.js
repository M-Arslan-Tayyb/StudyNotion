const Course = require("../models/courseModel");
const Section = require("../models/section");
const { CustomError, DatabaseError } = require('../utils/CustomError');

const createSectionService = async ({ sectionName, courseId }) => {
  try {
    // Create a new section
    const newSection = await Section.create({ name: sectionName });

    // Update the course with the new section
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { courseContent: newSection._id } },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: { path: 'Section' },
    });

    if (!updatedCourse) {
      throw new DatabaseError("Course not found", 404);
    }

    return {
      status: 200,
      msg: "Course section created successfully",
      success: true,
      updatedCourse,
    };
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    }
    throw new DatabaseError("Error while creating course section", 500);
  }
};

const updateSectionService = async ({ sectionName, sectionId }) => {
  try {
    // Update the section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { name: sectionName },
      { new: true }
    );

    if (!updatedSection) {
      throw new DatabaseError("Section not found", 404);
    }

    return {
      status: 200,
      msg: "Section updated successfully",
      success: true,
      sectionName: updatedSection.name,
    };
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    }
    throw new DatabaseError("Error updating section", 500);
  }
};

const deleteSectionService = async ({ sectionId, courseId }) => {
  try {
    // Delete the section
    await Section.findByIdAndDelete(sectionId);

    // Update the course by removing the section
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: sectionId } },
      { new: true }
    ).populate("courseContent");

    if (!updatedCourse) {
      throw new DatabaseError("Course not found", 404);
    }

    return {
      status: 200,
      msg: "Section deleted successfully",
      success: true,
      updatedCourse,
    };
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    }
    throw new DatabaseError("Error deleting section", 500);
  }
};

module.exports = {
  createSectionService,
  updateSectionService,
  deleteSectionService,
};
