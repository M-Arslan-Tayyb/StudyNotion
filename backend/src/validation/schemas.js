const Joi = require('joi');


// auth schemas
const sendOtpSchema = Joi.object({
  email: Joi.string().email().required(),
});

const signupSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  email: Joi.string().email().required(),
  accountType: Joi.string().valid('Student', 'Instructor', 'Admin').required(),
  otp: Joi.string().length(6).required(),
  contactNumber: Joi.string().optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
// rest pass schemas
const resetPasswordTokenSchema = Joi.object({
    email: Joi.string().email().required(),
  });

const resetPasswordSchema = Joi.object({
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    token:Joi.string().required()
});

// category schema  for creating course  and updating course  (admin only)
const CategorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  
});

const categoryPageDetailsSchema = Joi.object({
  categoryId: Joi.string().required(),
})
// course schemas
const createCourseSchema = Joi.object({
    courseName: Joi.string().required(),
    courseDescription: Joi.string().required(),
    whatWillYouLearn: Joi.string().required(),
    price: Joi.number().required(),
    thumbnail: Joi.any().optional(),
    tags: Joi.any().optional(),  // Allow any type for thumbnail
    instructions:  Joi.any().optional(),

    
    categoryIds: Joi.string().required(),
});

const getCourseDetailsSchema= Joi.object({
  courseId: Joi.string().required(),
})

//section schemas
const createSectionSchema = Joi.object({
  sectionName: Joi.string().required(),
  courseId: Joi.string().required(),
});

const updateSectionSchema =  Joi.object({
  sectionName: Joi.string().required(),
  sectionId: Joi.string().required(),
});

const deleteSectionSchema = Joi.object({
  sectionId: Joi.string().required(),
});

//subsection schemas:
const createSubSectionSchema= Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  videoUrl: Joi.string().optional(),
  timeDuration: Joi.string().required(),
  sectionId: Joi.string().required(),
});
const updateSubSectionSchema= Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  videoUrl: Joi.string().optional(),
  timeDuration: Joi.string().required(),
  subSectionId: Joi.string().required(),
});

const deleteSubSectionSchema= Joi.object({
  subSectionId: Joi.string().required(),
  sectionId: Joi.string().required(),
});

//profile schema:

const updateProfileSchema = Joi.object({
  gender: Joi.string().valid('Male', 'Female', 'Other').required(), 
  contactNumber: Joi.string().required(), 
});


//rattingAndReviewSchema:

const createRattingAndReviewSchema = Joi.object({
  courseId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().required(),
});

const getAverageRatingSchema = Joi.object({
  courseId: Joi.string().required(),
});
module.exports = {
  sendOtpSchema,
  signupSchema,
  loginSchema,
  CategorySchema,
  createCourseSchema,
  updateSectionSchema,
  createSectionSchema,
  resetPasswordSchema,
  resetPasswordTokenSchema,
  deleteSectionSchema,
  createSubSectionSchema,
  updateSubSectionSchema,
  updateProfileSchema,
  deleteSubSectionSchema,
  getCourseDetailsSchema,
  createRattingAndReviewSchema,
  getAverageRatingSchema,
  categoryPageDetailsSchema,
};
