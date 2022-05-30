const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const JWTSECRET = "lsdkjflsdjwerd2342fsdjfytsdas";

router.post("/users", async (req, res) => {
    const bio = "";
    const image = null;
    const { email, password, username } = req.body.user;
    let user = new User({ email, password, username, bio, image });

    try {
        await user.save();
        const userId = user._id.toString();
        const token = jwt.sign(
            { userId, username: username },
            JWTSECRET,
            { expiresIn: "2 h", subject: userId }
        );
        await User.updateOne({ username: username }, { token: token })
        user = ({ email, username, token, bio, image })
        res.json({ user });
    } catch (err) {
        console.log(err);
    }
});

exports.router = router;