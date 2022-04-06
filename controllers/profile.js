const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

router.get("/profiles/:username", async (req, res) => {
    const username = req.params.username;
    const profile = await User
        .find({ username: username })
        .exec()
    res.json({ profile })
})

exports.router = router;
