const mongoose = require('mongoose');

const Category= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    course:[{//us tag ka related multiple courses hon ga
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
  sales: { 
    type: Number,
    default: 0,
  }
})

module.exports = mongoose.model("Category",Category)
// module.exports = mongoose.model('OTP', otpSchema);
