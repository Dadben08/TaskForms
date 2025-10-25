const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const register = async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Email and password required' });


const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ message: 'Email already registered' });


const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);


const user = await User.create({ email, password: hashed });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN || '7d' });


res.status(201).json({ token });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


const login = async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Email and password required' });


const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });


const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ message: 'Invalid credentials' });


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN || '7d' });
res.json({ token });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


module.exports = { register, login };