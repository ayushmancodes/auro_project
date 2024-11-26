const mongoose = require('mongoose');

// Define the schema for user profiles
const UserProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true,   // Email must be unique
    },
    password: {
        type: String,
        required: true, // Password is required
    },
    skills: {
        type: [String],
        default: [], // Default to an empty array if no skills are provided
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the UserProfile model
module.exports = mongoose.model('UserProfile', UserProfileSchema);
