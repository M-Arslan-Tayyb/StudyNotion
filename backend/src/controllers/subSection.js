const {
  createSubSectionService,
  updateSubSectionService,
  deleteSubSectionService,
} = require('../services/subSectionService');


const createSubSection = async (req, res, next) => {
  try {
    const { title, timeDuration, description, sectionId } = req.body;
    const videoFile = req.files.videoFile;

    const result = await createSubSectionService({ title, timeDuration, description, sectionId, videoFile });
    return res.status(result.status).json(result);
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

const updateSubSection = async (req, res, next) => {
  try {
    const { title, timeDuration, description, subSectionId } = req.body;
    const videoFile = req.files.videoUrl;

    const result = await updateSubSectionService({ title, timeDuration, description, subSectionId, videoFile });
    return res.status(result.status).json(result);
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

const deleteSubSection = async (req, res, next) => {
  try {
    const { subSectionId, sectionId } = req.params;

    const result = await deleteSubSectionService({ subSectionId, sectionId });
    return res.status(result.status).json(result);
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

module.exports = {
  createSubSection,
  updateSubSection,
  deleteSubSection
};
