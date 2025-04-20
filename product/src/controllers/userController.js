const User = require('../models/userModel');
const { sendResponse } = require('../utils/response');

const userController = {
    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user) return sendResponse(res, 404, 'User not found');
            sendResponse(res, 200, 'User profile retrieved successfully', user);
        } catch (error) {
            sendResponse(res, 500, 'Server error', null, error.message);
        }
    },
};

module.exports = userController;