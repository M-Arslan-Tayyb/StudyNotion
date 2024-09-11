const mongoose = require('mongoose');

const rewAndRat= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ratings:{
        type: Number,
        required: true
    },
    review:{
        type: String,
        required: true
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
})

module.exports = mongoose.model("reviewAndRatings",rewAndRat)

