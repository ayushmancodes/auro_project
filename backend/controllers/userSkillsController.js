// Get user's skills list
const getUserSkillsList = async (req, res) => {
    try {
        // Ensure the user profile exists (retrieved via authentication middleware)
        const userProfile = req.user;
        if (!userProfile) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Return the user's skills or an empty array if no skills are found
        res.status(200).json({
            success: true,
            message: 'Skills fetched successfully.',
            data: userProfile.skills || [],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching skills list.',
            error: error.message,
        });
    }
};

module.exports = { getUserSkillsList };
