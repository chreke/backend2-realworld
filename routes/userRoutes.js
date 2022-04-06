const express = require('express');
const router = express.Router();

const {
  registerUser,
  login,
  getMe,
  updateUser,
  getProfile,
} = require('../controllers/userController');

router.post('/api/users', registerUser);
router.post('/api/users/login', login);
router.get('/api/user', getMe);
//router.put('/api/user', updateUser);
router.get('/api/profiles/:username', getProfile);
module.exports = router;
