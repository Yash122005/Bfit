import mongoose from 'mongoose';

const FoodItemSchema = new mongoose.Schema({
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
});

const MealSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String, // e.g., Breakfast, Lunch
        required: true,
    },
    items: [FoodItemSchema],
    totalCalories: {
        type: Number,
        required: true,
    },
    protein: Number,
    carbs: Number,
    fats: Number,
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default mongoose.models.Meal || mongoose.model('Meal', MealSchema);
