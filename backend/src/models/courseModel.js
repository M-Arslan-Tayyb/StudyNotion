const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  Instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  whatWillYouLearn: {
    type: String,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
  ],
  reviewAndRatings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviewAndRatings",
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  tags:{
    type: [String],
    required: true,
    
  },
  Category:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  }],
  studentEnrolled:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  
  }],
  instructions:{
    type: [String],
    
  },
  status:{
    type: String,
    enum: ['draft', 'published'],
    
  }
});
module.exports = mongoose.model('Course',courseSchema);