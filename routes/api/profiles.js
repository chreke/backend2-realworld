const { Router } = require("express");

const route = Router();

route.get("/", (req, res) => {
    res.send({
        "profile": {
            "username": "panos",
            "image": null,
        }
    })
}) 


module.exports = route