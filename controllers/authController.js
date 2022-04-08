const jwt = require("jsonwebtoken")
exports.auth_MiddleWare = function(req, res, next) {
    const auth = req.headers.authorization
    if(auth){
        const token = auth.split(" ")[1]
        const JWT_SECRET = process.env.JWT_SECRET
        req.user = jwt.verify(token, JWT_SECRET)
    }
    next()
}