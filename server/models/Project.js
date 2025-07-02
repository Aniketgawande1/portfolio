const express = require('express');
const {
  getProfile,
  updateProfile
} = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.route('/')
  .get(getProfile)
  .post(protect, upload.single('avatar'), updateProfile);

module.exports = router;