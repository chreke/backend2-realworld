const express = require('express');
const router = express.Router();

const { registerUser, login } = require('../controllers/userController');

router.post('/api/users', registerUser);
router.post('/api/users/login', login);

module.exports = router;