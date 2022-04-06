const jwt = require("jsonwebtoken")

const createUserToken = (user) => {
  const userId = user._id.toString()
  return (token = jwt.sign(
    { userId, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24 h", subject: userId }
  ))
}

module.exports = { createUserToken }
