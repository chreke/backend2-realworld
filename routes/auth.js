const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()

router.use((req, res, next) => {
    const auth = req.headers.authorization
    if(auth){
        const token = auth.split(" ")[1]
        const JWT_SECRET = process.env.JWT_SECRET
        const user = jwt.verify(token, JWT_SECRET)
        req.user = user.userId
    }
    next()
})

module.exports = router