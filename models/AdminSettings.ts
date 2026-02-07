import mongoose, { Schema } from 'mongoose';

const AdminSettingsSchema = new Schema(
    {
        verificationEmail: {
            type: String,
            default: 'admin@bfit.com',
        },
        verificationPhone: {
            type: String,
            default: '+1234567890',
        },
        verificationAddress: {
            type: String,
            default: '123 Fitness St, Workout City',
        },
    },
    { timestamps: true }
);

export default mongoose.models.AdminSettings || mongoose.model('AdminSettings', AdminSettingsSchema);
