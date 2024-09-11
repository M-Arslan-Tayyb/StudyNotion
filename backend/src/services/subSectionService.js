const SubSection = require("../models/subSection");
const Section = require("../models/section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { CustomError, DatabaseError } = require('../utils/CustomError');
require("dotenv").config();

const createSubSectionService = async ({ title, timeDuration, description, sectionId, videoFile }) => {
  try {
    // Upload video to cloudinary
    const videoUploadResponse = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME);

    // Create a new subsection in the database
    const newSubSection = await SubSection.create({
      title,
      timeDuration,
      description,
      videoFile: videoUploadResponse.secure_url, // Store the URL of the uploaded video
    });

    // Update the section with the new subsection
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSections: newSubSection._id } },
      { new: true }
    ).populate('subSections');

    if (!updatedSection) {
      throw new DatabaseError("Section not found", 404);
    }

    return { status: 200, msg: "Subsection created successfully", success: true, subSection: newSubSection, updatedSection };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new DatabaseError("Error creating subsection", 500);
  }
};

const updateSubSectionService = async ({ title, timeDuration, description, subSectionId, videoFile }) => {
  try {
    // Upload video to cloudinary
    const videoUploadResponse = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME);

    // Update the subsection in the database
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        title,
        timeDuration,
        description,
        videoFile: videoUploadResponse.secure_url,
      },
      { new: true }
    );

    if (!updatedSubSection) {
      throw new DatabaseError("Subsection not found", 404);
    }

    return { status: 200, msg: "Subsection updated successfully", success: true, subSection: updatedSubSection };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new DatabaseError("Error updating subsection", 500);
  }
};

const deleteSubSectionService = async ({ subSectionId, sectionId }) => {
  try {
    // Delete the subsection from the database
    const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

    if (!deletedSubSection) {
      throw new DatabaseError("Subsection not found", 404);
    }

    // Update the section by removing the deleted subsection
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $pull: { subSections: subSectionId } },
      { new: true }
    ).populate('subSections');

    if (!updatedSection) {
      throw new DatabaseError("Section not found", 404);
    }

    return { status: 200, msg: "Subsection deleted successfully", success: true, deletedSubSection, updatedSection };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new DatabaseError("Error deleting subsection", 500);
  }
};

module.exports = {
  createSubSectionService,
  updateSubSectionService,
  deleteSubSectionService
};
