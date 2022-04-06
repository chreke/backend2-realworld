const express = require("express");
const router = express.Router();
const { createNewUser } = require("../controllers/users");
const {
    checkEmptyFields,
    validateUsernameAndEmail,
} = require("../middlewares/validation");
const { login } = require("../models/User")
const { authUser, generateToken } = require("../controllers/auth")

router.post("/", checkEmptyFields, validateUsernameAndEmail, createNewUser);

router.post("/login", async (req, res) => {
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

module.exports = router;
