const express = require('express');
const router = express.Router();

// middleware
const {authMiddleware} = require('../middleware/authmiddleware')

const { registerUser,loginUser } = require('../controllers/authentication');
const { testJwt} = require('../controllers/test');


router.route('/registeruser').post(registerUser);
router.route('/loginuser').post(loginUser);
router.route('/testJwt').get(authMiddleware,testJwt)

module.exports = router;
