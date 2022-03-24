const { Router } = require("express");

const route = Router();

route.get("/", (req,res) => {
    res.send({
        "user": {
            "email": "panos@panos.panos",
            "password": "123",
        }
    })
})


module.exports = route