const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects
} = require('../controllers/projectController');

const { protect, adminOnly } = require('../middleware/auth');
const { uploadConfigs, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', getProject);

// Protected routes
router.use(protect); // All routes after this middleware are protected

router.post('/', uploadConfigs.multiple('images', 5), handleUploadError, createProject);
router.put('/:id', uploadConfigs.multiple('images', 5), handleUploadError, updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
