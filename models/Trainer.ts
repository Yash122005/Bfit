import mongoose, { Schema } from 'mongoose';

const TrainerSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name for the trainer.'],
            maxlength: [60, 'Name cannot be more than 60 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email for the trainer.'],
            unique: true,
        },
        photo: {
            type: String,
            required: [true, 'Please provide a photo URL.'],
        },
        specialization: {
            type: [String],
            required: true,
        },
        experience: {
            type: Number,
            required: true,
        },
        bio: {
            type: String,
            required: true,
        },
        certifications: {
            type: [String],
            required: true,
        },
        rating: {
            type: Number,
            default: 5.0,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Verified', 'Rejected'],
            default: 'Pending',
        },
        socials: {
            instagram: String,
            portfolio: String,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Trainer || mongoose.model('Trainer', TrainerSchema);
