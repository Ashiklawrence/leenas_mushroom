const asyncHandler = require('express-async-handler'); // Ensures clean error handling

// Register user function
exports.testJwt = asyncHandler(async (req, res) => {
    const user = req.user;

    res.status(200).json({
        status:"success",
        message: 'Profile fetched successfully',
        user,
    });
});