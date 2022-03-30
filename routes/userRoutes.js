const express = require("express")
const userRouter = express.Router()
const { userController } = require("../controllers/userController")

userRouter.post("/", (req, res) => {
    userController.userCreate(req)
})

module.exports = userRouter