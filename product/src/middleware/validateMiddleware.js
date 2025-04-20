const { body, validationResult } = require('express-validator');
const { sendResponse } = require('../utils/response');

const validateUser = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, 'Validation failed', null, errors.array());
        }
        next();
    },
];

module.exports = { validateUser };