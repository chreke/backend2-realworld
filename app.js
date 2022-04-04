const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const articlesRouter = require("./routers/articles")
const tagsRouter = require("./routers/tags")
const profilesRouter = require("./routers/profiles")
const usersRouter = require("./routers/users")
const userRouter = require("./routers/user")

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

app.use("/api/articles", articlesRouter)
app.use("/api/tags", tagsRouter)
app.use("/api/profiles", profilesRouter)
app.use("/api/users", usersRouter)
app.use("/api/user", userRouter)

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

mongoose.connect(`mongodb://localhost/realworld`)

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`)
})
