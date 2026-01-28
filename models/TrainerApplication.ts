import mongoose, { Schema } from 'mongoose';

const TrainerApplicationSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Please provide your full name.'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email.'],
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please provide your phone number.'],
        },
        gender: {
            type: String,
            required: [true, 'Please provide your gender.'],
        },
        experience: {
            type: Number,
            required: [true, 'Please provide your years of experience.'],
        },
        specialization: {
            type: [String],
            required: true,
        },
        certifications: {
            type: String, // Storing as text for MVP, could be file URL later
            required: true,
        },
        instagram: {
            type: String,
        },
        portfolio: {
            type: String,
        },
        bio: {
            type: String,
            required: true,
        },
        reason: {
            type: String,
            required: [true, 'Please explain why BFIT should verify you.'],
        },
        status: {
            type: String,
            enum: ['Pending', 'Verified', 'Rejected'],
            default: 'Pending',
        },
    },
    { timestamps: true }
);

export default mongoose.models.TrainerApplication ||
    mongoose.model('TrainerApplication', TrainerApplicationSchema);
