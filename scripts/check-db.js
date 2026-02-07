const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

const TrainerApplicationSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        status: String,
    },
    { strict: false } // We just want to count, strict false is easier for quick check
);

const TrainerApplication = mongoose.models.TrainerApplication || mongoose.model('TrainerApplication', TrainerApplicationSchema);

async function checkData() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');

        const count = await TrainerApplication.countDocuments();
        console.log(`Total Trainer Applications: ${count}`);

        if (count > 0) {
            const apps = await TrainerApplication.find().select('email status');
            console.log('Sample Apps:', apps);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkData();
