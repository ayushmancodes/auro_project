const mongoose = require('mongoose');

// Define the schema for job application data
const ApplicationDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true, // User is required
    },
    companyName: {
        type: String,
        required: true, // Company name is required
    },
    jobTitle: {
        type: String,
        required: true, // Job title is required
    },
    status: {
        type: String,
        enum: ['Applied', 'Interviewing', 'Accepted', 'Rejected'],
        default: 'Applied', // Default status is 'Applied'
    },
    deadline: {
        type: Date, // Deadline is optional
    },
    requiredSkills: {
        type: [String], // Array of strings for required skills
        default: [], // Default to an empty array if no skills are provided
    },
}, { timestamps: true }); // Adding timestamps for createdAt and updatedAt

// Export the model
module.exports = mongoose.model('ApplicationData', ApplicationDataSchema);
