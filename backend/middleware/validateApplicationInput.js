// Middleware to validate job application data
const validateApplicationData = (req, res, next) => {
    const { companyName, jobTitle } = req.body;

    // Check for missing fields
    if (!companyName || !jobTitle) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed: Company name and job title are required.',
        });
    }

    // Proceed to the next middleware or route handler
    next();
};

module.exports = { validateApplicationData };
