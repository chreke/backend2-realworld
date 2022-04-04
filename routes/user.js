const express = require("express");
const { user_login, user_update, verify } = require("../controllers/userController");
const router = express.Router()
router.post("/users/login", user_login)
router.put("/user", verify, user_update)

module.exports = router