const express = require('express');
const {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  getCurrentExperiences
} = require('../controllers/experiencesController');

const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getExperiences);
router.get('/current', getCurrentExperiences);
router.get('/:id', getExperience);

// Protected routes
router.use(protect); // All routes after this middleware are protected

router.post('/', createExperience);
router.put('/:id', updateExperience);
router.delete('/:id', deleteExperience);

module.exports = router;
