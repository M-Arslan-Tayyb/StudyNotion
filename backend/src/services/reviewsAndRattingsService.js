const { CustomError } = require('../utils/CustomError');
const Course = require("../models/courseModel");
const rattingAndReviewer = require("../models/reviewsAndRatings");
const mongoose = require("mongoose");

// Create Review and Rating Service
const createReviewAndRatingService = async (userId, rating, review, courseId) => {
    // Check if course exists and user is enrolled
    const courseDetails = await Course.findOne({ _id: courseId });
    if (!courseDetails) {
        throw new CustomError('Course not found', 404);
    }
    if (!courseDetails.studentEnrolled.includes(userId)) {
        throw new CustomError('Student is not enrolled in the course', 403);
    }

    // Check if the user has already reviewed the course
    const isReviewed = await rattingAndReviewer.findOne({ user: userId, course: courseId });
    if (isReviewed) {
        throw new CustomError('User has already reviewed this course', 208);
    }

    try {
        // Create a new review and rating
        const newReviewAndRating = new rattingAndReviewer({
            studentId: userId,
            courseId: courseId,
            rating: rating,
            review: review
        });

        const savedReviewAndRating = await newReviewAndRating.save();

        // Update the course with the new review and rating
        await Course.findByIdAndUpdate(courseId, { $push: { reviewAndRatings: savedReviewAndRating._id } });

        return { status: 200, message: "Review and rating created successfully", ratingAndReview: savedReviewAndRating };
    } catch (err) {
        throw new CustomError('Error while creating review and rating', 500);
    }
};

// Get Average Rating Service
const getAverageRattingAndReviewService = async (courseId) => {
    try {
        // Calculate average rating using aggregation
        const results = await rattingAndReviewer.aggregate([
            { $match: { courseId: new mongoose.Types.ObjectId(courseId) } },
            { $group: { _id: null, averageRating: { $avg: "$rating" } } }
        ]);

        if (results.length === 0) {
            throw new CustomError('No ratings found for this course', 404);
        }

        return { status: 200, averageRating: results[0].averageRating, message: "Average rating retrieved successfully" };
    } catch (err) {
        throw new CustomError('Error calculating average rating', 500);
    }
};

// Get All Ratings Service
const getAllRatingsService = async () => {
    try {
        // Get all reviews and ratings:
        const reviewAndRatings = await rattingAndReviewer.find({})
            .sort({ rating: "desc" })
            .populate({
                path: 'user', // Reference the 'user' field in reviewAndRatings schema
                select: 'firstName lastName image' // Selecting specific fields from the User schema
            })
            .exec();

        if (reviewAndRatings.length === 0) {
            throw new CustomError('No reviews and ratings found', 404);
        }

        return {
            status: 200,
            reviewAndRatings,
            message: "Reviews and ratings found successfully"
        };
    } catch (err) {
        throw new CustomError('Error fetching reviews and ratings', 500);
    }
};

module.exports = { createReviewAndRatingService, getAverageRattingAndReviewService, getAllRatingsService };
