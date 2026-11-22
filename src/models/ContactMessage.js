const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2 },
  email: { type: String, required: true, trim: true, lowercase: true },
  topic: { type: String, required: true },
  message: { type: String, required: true, trim: true, minlength: 10, maxlength: 500 },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
