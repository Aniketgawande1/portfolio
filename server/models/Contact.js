const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
    trim: true,
    maxlength: [100, 'Subject cannot be more than 100 characters']
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number cannot be more than 20 characters']
  },
  company: {
    type: String,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  projectType: {
    type: String,
    enum: ['Web Development', 'Mobile App', 'Desktop App', 'Consultation', 'Other']
  },
  budget: {
    type: String,
    enum: ['< $1K', '$1K - $5K', '$5K - $10K', '$10K - $25K', '$25K+', 'Not specified']
  },
  timeline: {
    type: String,
    enum: ['ASAP', '1-2 weeks', '1 month', '2-3 months', '3+ months', 'Flexible']
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Responded', 'Closed'],
    default: 'New'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: {
    type: Date
  }
});

// Index for sorting by creation date and status
ContactSchema.index({ createdAt: -1, status: 1 });

module.exports = mongoose.model('Contact', ContactSchema);
