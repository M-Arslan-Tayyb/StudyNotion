const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim:true,
    },
    lastName:{
        type: String,
        required: true,
        trim:true,
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique: true,
        
    },
    password:{
        type: String,
        required: true,
       
    },
    accountType:{
        type: String,
        required: true,
        enum: ['Admin', 'Student','Instructor'],
    },
    addionalDetails:{
        //this mean that hum user ma, user profile ka data be store kry ga jo ka user login ka bad enter kry ga like
        // gender, occupation etc.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    //the token and resetPasswordExpiration fields is for reset password
    token:{
        type: String,
    },
    resetPasswordExpiration:{
        type: Date,
    },
    courses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }

    ],
    image:{
        type: String,
        required: true,
    },
    courseProgress:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CourseProgress',
        }
    ],
    // deletedAt: {//check the user account deleted at what time?
    //     type: Date,

    //   },
})

module.exports=mongoose.model('User',userSchema);