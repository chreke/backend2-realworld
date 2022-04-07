
const JWT_SECRET = "34567hthgfkjfhgsfesghfgjhmcvcgn";

exports.SECRET = JWT_SECRET


// req.user exists if JWT Token Check == OK 
function requireLogin(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401); // 401 - Unauthorized
    }
}

exports.requireLogin = requireLogin
