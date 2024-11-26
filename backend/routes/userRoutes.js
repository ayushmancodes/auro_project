const express = require('express');
const { registerNewUser, loginUser, updateUserSkills } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to register a new user
router.post('/register', registerNewUser);

// Route for user login
router.post('/login', loginUser);

// Route to update user skills (authentication required)
router.put('/skills', protect, updateUserSkills);

module.exports = router;
