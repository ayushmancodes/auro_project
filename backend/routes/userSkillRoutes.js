const express = require('express');
const { getUserSkills } = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route for fetching user skills
router.get('/skills', protect, getUserSkills);

module.exports = router;
