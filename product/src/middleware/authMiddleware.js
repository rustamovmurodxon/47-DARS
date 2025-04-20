const jwt = require('jsonwebtoken');
const { sendResponse } = require('../utils/response');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return sendResponse(res, 401, 'Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        sendResponse(res, 401, 'Invalid token');
    }
};

module.exports = authMiddleware;