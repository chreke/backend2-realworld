const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');

const {
  registerUser,
  login,
  getMe,
  updateUser,
  getProfile,
} = require('../controllers/userController');

router.post('/api/users', registerUser);
router.post('/api/users/login', login);
router.get('/api/user', protect, getMe);
router.put('/api/user', protect, updateUser);
router.get('/api/profiles/:username', protect, getProfile);
module.exports = router;
