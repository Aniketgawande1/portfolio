const express = require('express');
const {
  submitContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

const { protect, adminOnly } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiting for contact form submissions
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions, please try again later.'
  }
});

// Public routes
router.post('/', contactLimiter, submitContact);

// Protected routes (Admin only)
router.use(protect);
router.use(adminOnly);

router.get('/', getContacts);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
