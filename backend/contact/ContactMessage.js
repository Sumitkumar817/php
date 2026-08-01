import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  enquiryType: { type: String, required: true },
  service: { type: String, default: '' },
  message: { type: String, required: true },
  status: { type: String, enum: ['Unread', 'Read'], default: 'Unread' }
}, { timestamps: true });

export default mongoose.model('ContactMessage', contactMessageSchema);
