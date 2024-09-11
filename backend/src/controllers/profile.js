const { updateProfileService, deleteAccountService, updateDisplayPictureService, getUserDetailsService } = require("../services/profileService");


const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    const result = await updateProfileService(userId, profileData);
    return res.status(result.status).json(result);
  } catch (err) {
    next(err);  // Pass the error to the global error handler
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await deleteAccountService(userId);
    return res.status(result.status).json(result);
  } catch (err) {
    next(err);
  }
};

const updateDisplayPicture = async (req, res, next) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const result = await updateDisplayPictureService(userId, displayPicture);

    return res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    next(error);
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await getUserDetailsService(userId);
    return res.status(result.status).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { updateProfile, deleteAccount, updateDisplayPicture, getUserDetails };
