const { createReviewAndRatingService, getAverageRattingAndReviewService, getAllRatingsService } = require("../services/reviewsAndRattingsService");

// Create Review and Rating Controller
const createReviewAndRating = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user is authenticated
        const { rating, review, courseId } = req.body;

        const result = await createReviewAndRatingService(userId, rating, review, courseId);

        return res.status(result.status).json({
            message: result.message,
            data: result.ratingAndReview,
        });
    } catch (err) {
        next(err); // Pass the error to errorHandler middleware
    }
};

// Get Average Rating Controller
const getAverageRating = async (req, res, next) => {
    try {
        const { courseId } = req.body;

        const result = await getAverageRattingAndReviewService(courseId);

        return res.status(result.status).json({
            message: result.message,
            averageRating: result.averageRating || 0,
        });
    } catch (err) {
        next(err); // Pass the error to errorHandler middleware
    }
};

// Get All Ratings Controller
const getAllRatings = async (req, res, next) => {
    try {
        const result = await getAllRatingsService();

        return res.status(result.status).json({
            message: result.message,
            ratings: result.reviewAndRatings || [],
        });
    } catch (err) {
        next(err); // Pass the error to errorHandler middleware
    }
};

module.exports = { createReviewAndRating, getAverageRating, getAllRatings };
