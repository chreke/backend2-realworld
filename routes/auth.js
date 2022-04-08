const express = require("express")
const jwt = require("jsonwebtoken")
const { auth_MiddleWare } = require("../controllers/authController")
const router = express.Router()

router.use(auth_MiddleWare)

module.exports = router