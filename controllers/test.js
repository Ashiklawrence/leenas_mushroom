const asyncHandler = require('express-async-handler'); // Ensures clean error handling

// Register user function
exports.testJwt = asyncHandler(async (req, res) => {
    const user = req.user;

    res.status(200).json({
        message: 'Profile fetched successfully',
        user,
    });
});