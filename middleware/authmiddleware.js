const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
require('dotenv').config();
const userdb = require('../models/user'); 

exports.authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({status:"success", message: 'Not authorized, token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userdb.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({status:"failed", message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({status:"failed", message: 'Not authorized, invalid token', error });
    }
});
