const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { validateApplicationInput } = require('../middleware/validateInput');
const { createJobApplication, getUserApplications } = require('../controllers/applicationController');

const router = express.Router();

// Route to create a new job application
router.post('/', validateApplicationInput, protect, createJobApplication);

// Route to get job applications for a user by userId
router.get('/:userId', protect, getUserApplications);

module.exports = router;
