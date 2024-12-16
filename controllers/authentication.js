const userdb = require('../models/user'); // Ensure this is correct
const bcrypt = require('bcryptjs'); // Missing import
const asyncHandler = require('express-async-handler'); // Ensures clean error handling

const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register user function
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    // Check if user already exists
    const existingUser = await userdb.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await userdb.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});


exports.loginUser = asyncHandler(async (req,res)=>{
    const { username, password } = req.body;

  try {
    const user = await userdb.findOne({ username });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '20s' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
})