const express = require("express");
const { verify, getUserProfile } = require("../controllers/userController");
const router = express.Router()
router.get('/profiles/:username', verify, getUserProfile)
module.exports = router