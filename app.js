const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const { User } = require("./models/user")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
const PORT = 3000

const jwt = require("jsonwebtoken")

const authorizeUser = (req, res, next) => {
  const authHeader = req.header("Authorization")
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    req.token = token
  }
  next()
}

app.use(express.static("dist"))
app.use(express.json())
app.use(authorizeUser)

app.post("/users", async (req, res) => {
  const { username, email, password } = req.body.user
  console.log(req.body)
  const user = new User({ username, email, password })
  const createdUser = await user.save()

  res.json({
    user: {
      username: createdUser.username,
      email: createdUser.email,
    },
  })
})

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body.user
  const user = await User.login(email, password)
  if (user) {
    const userId = user._id.toString()
    console.log(userId)
    const token = jwt.sign(
      { userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24 h", subject: userId }
    )
    return res.json({
      user: { token, email: user.email, username: user.username },
    })
  } else {
    res.sendStatus(401)
  }
})

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.get("/user", async (req, res) => {
  const user = req.user
  const { userId } = user
  const databaseUser = await User.findOne({ _id: userId })
  console.log(databaseUser)
  res.json({
    user: {
      email: user.email,
      token: req.token,
      username: databaseUser.username,
    },
  })
})

mongoose.connect(`mongodb://localhost/realworld`)

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`)
})
