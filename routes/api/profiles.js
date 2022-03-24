const { Router } = require("express");

const route = Router();

route.get("/:username", (req, res) => {
    res.send({
        "profile": {
            "username": req.params.username,
            "bio": "Hello there",
            "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
            "following": false
        }
    })
}) 


module.exports = route