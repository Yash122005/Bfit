import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    bodyFat: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
