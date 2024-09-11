const mongoose = require('mongoose');
const { sendEmail } = require('../utils/mailSender');
const { number } = require('joi');
const emailVerification=require('../mails/template/emailverification')

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300000 // 5 minutes expiry time (300000 milliseconds)
    }
});

// Pre middleware for sending OTP whenever a user signs up
const subject = "Verification Email From StudyNotion";

async function sendVerificationEmail(email, otp) {
    try {
        const response = await sendEmail(email, subject,emailVerification(otp) );
        console.log("Verification email sent", response);
    } catch (err) {
        console.error("Error sending verification email", err);
    }
}

otpSchema.pre('save', async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
});

module.exports = mongoose.model('OTP', otpSchema);
