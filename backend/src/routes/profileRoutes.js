const express = require('express');
const { updateDisplayPicture,getUserDetails,updateProfile,deleteAccount } = require('../controllers/profile');
const validate = require('../middlewares/validation');
const {auth} = require('../middlewares/auth');
const { updateProfileSchema} = require('../validation/schemas');
const {sendOtpLimiter,generalRateLimiter,sensitiveRateLimiter}=require('../middlewares/rateLImiter')


const router = express.Router();
                                        //Authentication routes
router.put('/update-display-picture',sensitiveRateLimiter,validate(updateProfileSchema),auth, updateDisplayPicture);
router.get('/get-user-details',generalRateLimiter,auth, getUserDetails);
router.put('/update-additional-fields',generalRateLimiter,auth, updateProfile);
router.delete('/delete-user-account',sensitiveRateLimiter,auth, deleteAccount);




module.exports = router;
