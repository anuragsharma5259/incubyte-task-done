import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    // Check existing user
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create user
    const user = await userRepository.create({ name, email, password, role: 'user' });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    // Admin check
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      let admin = await userRepository.findByEmail(process.env.ADMIN_EMAIL);
      
      if (!admin) {
        admin = await userRepository.create({
          name: 'Administrator',
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          role: 'admin'
        });
      }

      const token = generateToken(admin._id);
      return res.json({
        success: true,
        token,
        user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
      });
    }

    // User login
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
