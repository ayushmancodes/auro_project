const UserProfile = require('../models/UserProfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUserProfile = async (req, res) => {
    const { fullName, emailAddress, password, skillsList } = req.body;

    try {
        // Validate required fields
        if (!fullName || !emailAddress || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Check if the user already exists
        const userExists = await UserProfile.findOne({ email: emailAddress });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user profile
        const userProfile = new UserProfile({
            fullName,
            email: emailAddress,
            password: hashedPassword,
            skills: skillsList || [], // Handle skills if provided
        });

        await userProfile.save();

        res.status(201).json({
            success: true,
            data: {
                _id: userProfile._id,
                fullName: userProfile.fullName,
                email: userProfile.email,
                skills: userProfile.skills,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating user profile.', error: error.message });
    }
};

// User login
const loginUserProfile = async (req, res) => {
    const { emailAddress, password } = req.body;

    try {
        // Validate required fields
        if (!emailAddress || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        // Check if the user exists
        const userProfile = await UserProfile.findOne({ email: emailAddress });
        if (!userProfile || !(await bcrypt.compare(password, userProfile.password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }

        // Generate JWT
        const token = jwt.sign({ id: userProfile._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            data: {
                token,
                user: {
                    _id: userProfile._id,
                    fullName: userProfile.fullName,
                    email: userProfile.email,
                    skills: userProfile.skills,
                },
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error logging in.', error: error.message });
    }
};

// Update user skills
const updateUserSkillsList = async (req, res) => {
    const { skillsList } = req.body;

    try {
        // Validate skills list
        if (!Array.isArray(skillsList)) {
            return res.status(400).json({ success: false, message: 'Skills must be an array.' });
        }

        // Find user by ID (assuming `req.user._id` comes from authenticated middleware)
        const userProfile = await UserProfile.findById(req.user._id);
        if (!userProfile) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Update skills
        userProfile.skills = skillsList || [];
        await userProfile.save();

        res.status(200).json({
            success: true,
            message: 'Skills updated successfully.',
            data: { skills: userProfile.skills },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating skills.', error: error.message });
    }
};

module.exports = { registerUserProfile, loginUserProfile, updateUserSkillsList };
