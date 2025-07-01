const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// Get current logged-in user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Update logged-in user profile
router.put('/me', authMiddleware, async (req, res) => {
  const updates = req.body;
  const allowedUpdates = [
    'name', 'location', 'birthday', 'healthGoals',
    'dietaryPreferences', 'notificationPreferences'
  ];

  // Filter invalid fields
  const keys = Object.keys(updates);
  const isValid = keys.every(key => allowedUpdates.includes(key));
  if (!isValid) {
    return res.status(400).json({ message: 'Invalid fields in update' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

module.exports = router;
