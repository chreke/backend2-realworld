const jwt = require("jsonwebtoken")
const {User, updateProfile} = require("../models/user")
const JWT_SECRET = process.env.JWT_SECRET
exports.verify = (req, res, next) => {
    if(req.user){
        next()
    }else {
      res.sendStatus(401)  
    }
    
}
exports.user_login = async function(req, res, next) {
        const {email, password} = req.body.user
        const userLogin = await User.login(email, password)
        if(userLogin){
          const userId = userLogin._id.toString()
          const token = jwt.sign({ 
            userId, userEmail: userLogin.email
          },
          JWT_SECRET,
          {
            expiresIn: "24h", subject: userId
          })
          const user = await User.findOneAndUpdate({email}, {token: token}, {new: true}).select({"password": false})
          res.json({user})
        } 
}

exports.user_update = async function(req, res, next) {
    const {userId} = req.user
    const userInfo = { username, email, password, bio, image, token} = req.body.user
    const user = await updateProfile(userInfo,userId ) 
    res.json({user}) 
}