const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const JWTSECRET = "lsdkjflsdjwerd2342fsdjfytsdas";

router.post("/users/login", async (req, res) => {
    const { email, password } = req.body.user;
    let user = await User.login(email, password);
    if (user) {
        const userId = user._id.toString();
        const token = jwt.sign(
            { userId, username: user.username },
            JWTSECRET,
            { expiresIn: "2 h", subject: userId }
        );
        await User.updateOne({ username: user.username }, { token: token })
        username = user.username;
        bio = user.bio;
        image = user.image;
        user = ({ email, username, token, bio, image })
        res.json({ user });
    } else {
        res.sendStatus(401);
    }
});

exports.router = router;