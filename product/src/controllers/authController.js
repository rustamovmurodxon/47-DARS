const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { sendResponse } = require('../utils/response');

const authController = {
    register: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const existingUser = await User.findByEmail(email);
            if (existingUser) return sendResponse(res, 400, 'User already exists');

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create(name, email, hashedPassword);

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            sendResponse(res, 201, 'User registered successfully', { token });
        } catch (error) {
            sendResponse(res, 500, 'Server error', null, error.message);
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findByEmail(email);
            if (!user) return sendResponse(res, 400, 'Invalid credentials');

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return sendResponse(res, 400, 'Invalid credentials');

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            sendResponse(res, 200, 'Login successful', { token });
        } catch (error) {
            sendResponse(res, 500, 'Server error', null, error.message);
        }
    },
};

module.exports = authController;