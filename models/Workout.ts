import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please provide a workout name'],
    },
    type: {
        type: String,
        enum: ['Cardio', 'Strength', 'Flexibility', 'Other'],
        required: true,
    },
    duration: {
        type: Number, // in minutes
        required: true,
    },
    caloriesBurned: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default mongoose.models.Workout || mongoose.model('Workout', WorkoutSchema);
