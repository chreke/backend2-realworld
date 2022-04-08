const express = require("express");
const router = express.Router();
const app = express();

const { User } = require("../models/user");

router.get("/user", async (req, res) => {

    userLoggedIn = req.user;
    let user = await User
        .find({ _id: req.user.userId })
        .exec()
    email = user[0].email;
    token = user[0].token;
    username = user[0].username;
    bio = user[0].bio;
    image = user[0].image;
    user = ({ user, username, token, bio, image })
    res.json({ user })
});

exports.router = router;