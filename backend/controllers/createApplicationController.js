const JobApplication = require('../models/JobApplication');

// Create a new job application
const submitApplication = async (req, res) => {
    try {
        const { applicantId, companyName, positionTitle, applicationDeadline, requiredSkills } = req.body;

        // Validate required fields
        if (!applicantId || !companyName || !positionTitle || !applicationDeadline || !requiredSkills) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const jobApplication = new JobApplication({
            applicantId,
            companyName,
            positionTitle,
            applicationDeadline,
            requiredSkills,
        });

        await jobApplication.save();
        res.status(201).json({ success: true, data: jobApplication });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to submit the job application.' });
    }
};

// Get job applications for an applicant
const fetchApplications = async (req, res) => {
    try {
        const { applicantId } = req.params;

        // Validate applicantId
        if (!applicantId) {
            return res.status(400).json({ success: false, message: 'Applicant ID is required.' });
        }

        const jobApplications = await JobApplication.find({ applicantId });

        // Check if applications exist
        if (jobApplications.length === 0) {
            return res.status(404).json({ success: false, message: 'No job applications found for this applicant.' });
        }

        res.status(200).json({ success: true, data: jobApplications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch job applications.' });
    }
};

module.exports = { submitApplication, fetchApplications };

