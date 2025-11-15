import mongoose from 'mongoose';
import Sweet from '../models/Sweet.js';
import seedData from '../utils/seedData.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
    
    // Auto-seed sweets
    const count = await Sweet.countDocuments();
    if (count === 0) {
      console.log('📦 Seeding sweets...');
      await seedData();
    }
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
