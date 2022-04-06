const express = require("express");
const userRouter = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("../models/User");
const { userController } = require("../controllers/userController");
const {
    checkEmptyFields,
    validateUsernameAndEmail,
} = require("../middlewares/validation");
const { login } = require("../models/User")
const { authUser, generateToken } = require("../controllers/auth")

userRouter.post("/", checkEmptyFields, validateUsernameAndEmail, (req, res) => {

    userController.userCreate(req, res);


});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body.user;
    const user = await login(email, password);
    //console.log(user)
    if (user) {
        const token = await generateToken(user);
        user.token = token
        await user.save()
        res.json({ user });
    } else {
        res.sendStatus(401);
    }
})

userRouter.get("/user", authUser, (req, res) => {
    const { username } = req.user;
    res.json({ username });
})

module.exports = userRouter;
