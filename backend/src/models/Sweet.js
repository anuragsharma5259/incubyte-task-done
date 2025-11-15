import mongoose from 'mongoose';

const sweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['chocolate', 'candy', 'gummy', 'hard candy', 'lollipop', 'other']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 0,
    default: 0
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true });

export default mongoose.model('Sweet', sweetSchema);
