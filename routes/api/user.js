const { Router } = require("express");

const route = Router();

// GET CURRENT USER - Fake response - it works (but in route http://localhost:3000/api/user/ NOT http://localhost:3000/user/)

route.get("/", (req, res) => {    
    res.send({
        "user": {
            "email": "panos@panos.panos",
            // "email": req.body.user.email,
            "username": "panos",
            // "username": req.body.user.username,
            "token": "jwt.token.here",
            "bio": "I am Panos",
            "image": "image",
        }
    })
})

module.exports = route