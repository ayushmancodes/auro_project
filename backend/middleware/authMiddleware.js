const jwt = require('jsonwebtoken');
const UserProfile = require('../models/User'); // Updated User to UserProfile

// Middleware to authenticate the user
const authenticateUser = async (req, res, next) => {
    try {
        // Check if the Authorization header contains a Bearer token
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.',
            });
        }

        // Extract the token
        const authToken = authHeader.split(' ')[1];

        // Verify the token
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

        // Retrieve the user profile associated with the token
        const userProfile = await UserProfile.findById(decodedToken.id).select('-password');
        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        // Attach user profile to the request object
        req.user = userProfile;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid or expired tokens
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token. Please log in again.',
            error: error.message,
        });
    }
};

module.exports = { authenticateUser };
