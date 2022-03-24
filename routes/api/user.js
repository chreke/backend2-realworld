const { Router } = require("express");

const route = Router();

route.get("/", (req, res) => {
    
    // Checked if "http://localhost:3000/api/user" route establed. It did!
    res.send({
        "user": {
            "email": "panos@panos.panos",
            "token": "jwt.token.here",
            "username": "panos",
            "bio": "I am Panos",
            "image": null,
        }
    })
})

module.exports = route