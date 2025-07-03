const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  technologies: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Web Development', 'Mobile App', 'Desktop App', 'API', 'Other']
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'On Hold'],
    default: 'In Progress'
  },
  featured: {
    type: Boolean,
    default: false
  },
  images: [{
    url: String,
    alt: String
  }],
  demoUrl: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  githubUrl: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  challenges: [{
    type: String
  }],
  solutions: [{
    type: String
  }],
  learnings: [{
    type: String
  }],
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

// Create project slug from the title
ProjectSchema.pre('save', function(next) {
  this.slug = this.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);