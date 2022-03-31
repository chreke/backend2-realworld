const express = require('express');
const router = express.Router();

const { registerUser, login } = require('../controllers/userController');

router.post('/users', registerUser);
router.post('/users/login', login);

module.exports = router;
