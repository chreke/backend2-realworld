const express = require("express")
const {User} = require("../models/user")
const jwt = require("jsonwebtoken");
const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET
router.post("/users/login", async (req, res) => {
    const {email, password} = req.body.user
    const userLogin = await User.login(email, password)
    if(userLogin){
      const userId = userLogin._id.toString()
      const token = jwt.sign({ 
        userId: userLogin.email, userId
      },
      JWT_SECRET,
      {
        expiresIn: "24h", subject: userId
      })
      const user = await User.findOneAndUpdate({email}, {token: token}, {new: true}).select({"password": false})
      res.json({user})
    } 
});  

module.exports = router