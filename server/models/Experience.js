const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
    maxlength: [100, 'Location cannot be more than 100 characters']
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
    required: [true, 'Please specify employment type']
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date']
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: [true, 'Please add a job description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  responsibilities: [{
    type: String,
    required: true
  }],
  achievements: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  skills: [{
    type: String
  }],
  companyWebsite: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  companyLogo: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for sorting by order and start date
ExperienceSchema.index({ order: -1, startDate: -1 });

module.exports = mongoose.model('Experience', ExperienceSchema);
