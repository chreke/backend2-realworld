const express = require("express")
const userRouter = express.Router()
const { userController } = require("../controllers/userController")
const { checkEmptyFields, validateUsernameAndEmail } = require("../middlewares/validation")

userRouter.post("/", checkEmptyFields, validateUsernameAndEmail, (req, res) => {
    userController.userCreate(req, res)
})

module.exports = userRouter