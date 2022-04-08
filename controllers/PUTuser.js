const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

const requireLogin = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401);
    }
};

router.put("/user", requireLogin, async (req, res) => {
    const { email, username, image, bio } = req.body.user
    const { password } = req.body.user

    const user = req.user.userId
    const filter = { _id: `${user}` }

    console.log(email, username, password, image, bio)
    console.log(user)

    User.findOneAndUpdate(filter, { $set: { email: email, username: username, password: password, image: image, bio: bio } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!")
        }
        res.redirect("/")
    })
});

exports.router = router;