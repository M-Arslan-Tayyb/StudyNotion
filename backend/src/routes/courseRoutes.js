const express = require('express');
const {createCategory,showAllCategory,categoryPageDetails  } = require('../controllers/category');
const {createSection,deleteSection,updateSection  } = require('../controllers/section');
const {createSubSection,deleteSubSection,updateSubSection } = require('../controllers/subSection');
const { createReviewAndRating,getAllRatings,getAverageRating} = require('../controllers/rattingAndReview');



const { createCourse,getCourseDetails,showAllCourse } = require('../controllers/course');

const validate = require('../middlewares/validation');
const {auth,isAdmin, isInstructor,isStudent} = require('../middlewares/auth');
const { createRattingAndReviewSchema,deleteSubSectionSchema,updateSubSectionSchema,createSubSectionSchema,CategorySchema,createCourseSchema,createSectionSchema,deleteSectionSchema,
    updateSectionSchema,getCourseDetailsSchema } = require('../validation/schemas');
const {generalRateLimiter,sensitiveRateLimiter}=require('../middlewares/rateLImiter')


const router = express.Router();
                                    //category
router.post('/create-category',generalRateLimiter,validate(CategorySchema),auth,isAdmin, createCategory);
router.get('/show-all-categories',generalRateLimiter, showAllCategory);
                                    //Course routes
router.post('/create-course',generalRateLimiter,validate(createCourseSchema),auth,isInstructor, createCourse);
router.post('/add-section',generalRateLimiter,validate(createSectionSchema), createSection);
router.post('/delete-section',generalRateLimiter,validate(deleteSectionSchema), deleteSection);
router.post('/update-section',generalRateLimiter,validate(updateSectionSchema), updateSection);
router.post('/get-course-details',generalRateLimiter,validate(getCourseDetailsSchema), getCourseDetails);//post instead of get is due to security, bcz get add the parameter to the url
router.post('/add-sub-section',generalRateLimiter,validate(createSubSectionSchema),createSubSection );
router.post('/update-subSection',generalRateLimiter,validate(updateSubSectionSchema),updateSubSection );
router.post('/delete-subSection',generalRateLimiter,validate(deleteSubSectionSchema),deleteSubSection );


router.get('/get-all-courses',generalRateLimiter, showAllCourse);

                                        // review and ratting:

router.post('/create-rating',generalRateLimiter,validate(createRattingAndReviewSchema),auth,isStudent,createReviewAndRating );








module.exports = router;