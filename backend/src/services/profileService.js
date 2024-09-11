const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { CustomError } = require("../utils/CustomError");

const updateProfileService = async (userId, profileData) => {
  try {
    const { gender, DateOfBirth = "", about = "", contactNumber } = profileData;

    const userDetails = await User.findById(userId);
    if (!userDetails) {
      throw new CustomError("User not found for making profile", 404);
    }

    const profileId = userDetails.addionalDetails;
    const profileDetails = await Profile.findById(profileId);
    if (!profileDetails) {
      throw new CustomError("Profile not found", 404);
    }

    profileDetails.gender = gender;
    profileDetails.DateOfBirth = DateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;

    await profileDetails.save();
    return { status: 200, msg: "Profile updated successfully", success: true, profileDetails };
  } catch (err) {
    throw new CustomError(err.message || "Error updating profile", err.statusCode || 500);
  }
};

const deleteAccountService = async (userId) => {
  try {
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      throw new CustomError("User not found", 404);
    }

    if (!userDetails.addionalDetails) {
      throw new CustomError("Profile ID is missing", 400);
    }

    await Profile.findByIdAndDelete(userDetails.addionalDetails);

    if (userDetails.accountType === "Student") {
      const userCourses = await Course.find({ studentEnrolled: userId });
      for (let course of userCourses) {
        course.studentEnrolled.pull(userId);
        await course.save();
      }
    }

    await User.findByIdAndDelete(userId);
    return { status: 200, msg: "Account deleted successfully", success: true };
  } catch (err) {
    throw new CustomError(err.message || "Error while deleting account", err.statusCode || 500);
  }
};

const updateDisplayPictureService = async (userId, displayPicture) => {
  try {
    const image = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000);
    
    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    );

    return { success: true, message: 'Image Updated successfully', data: updatedProfile };
  } catch (error) {
    throw new CustomError('Error updating display picture', 500);
  }
};

const getUserDetailsService = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password').populate("addionalDetails");
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    return {
      success: true,
      status: 200,
      message: 'User details retrieved successfully',
      data: user,
    };
  } catch (error) {
    throw new CustomError('Error fetching user details', 500);
  }
};

module.exports = { updateProfileService, deleteAccountService, updateDisplayPictureService, getUserDetailsService };
