const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const User = require('./models/User');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Contact = require('./models/Contact');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8')
);

const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/data/projects.json`, 'utf-8')
);

const experiences = JSON.parse(
  fs.readFileSync(`${__dirname}/data/experiences.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await Project.create(projects);
    await Experience.create(experiences);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();
    await Experience.deleteMany();
    await Contact.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
