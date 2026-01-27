import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    age: {
        type: Number,
    },
    height: {
        type: Number, // in cm or ft? let's assume cm for calculation or store as string if needed, but Number is better.
    },
    weight: {
        type: Number, // current weight
    },
    fitnessGoal: {
        type: String,
        enum: ['Fat Loss', 'Muscle Gain', 'Maintenance'],
        default: 'Maintenance',
    },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
