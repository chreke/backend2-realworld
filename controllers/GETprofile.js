const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

router.get("/profiles/:username", async (req, res) => {
    let username = req.params.username;
    let profile = await User
        .find({ username: username })
        .exec()
    bio = profile[0].bio;
    image = profile[0].image;
    profile = ({ username, bio, image, following: false })
    res.json({ profile })
})

exports.router = router;
