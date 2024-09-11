const { createSectionService, updateSectionService, deleteSectionService } = require('../services/sectionService');


const createSection = async (req, res, next) => {
  try {
    const { sectionName, courseId } = req.body;
    const result = await createSectionService({ sectionName, courseId });
    return res.status(result.status).json(result);
  } catch (err) {
    next(err); // Pass error to global error handler
  }
};

const updateSection = async (req, res, next) => {
  try {
    const { sectionName, sectionId } = req.body;
    const result = await updateSectionService({ sectionName, sectionId });
    return res.status(result.status).json(result);
  } catch (err) {
    next(err); // Pass error to global error handler
  }
};

const deleteSection = async (req, res, next) => {
  try {
    const { sectionId, courseId } = req.params;
    const result = await deleteSectionService({ sectionId, courseId });
    return res.status(result.status).json(result);
  } catch (err) {
    next(err); // Pass error to global error handler
  }
};

module.exports = { 
  createSection,
  updateSection,
  deleteSection,
};
