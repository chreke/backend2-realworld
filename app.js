const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const { User } = require("./models/user")

const app = express()
const PORT = 3000

app.use(express.static("dist"))
app.use(express.json())

app.post("/users", async (req, res) => {
  const { username, email, password } = req.body.user
  const user = new User({ username, email, password })
  const createdUser = await user.save()

  res.json({
    user: {
      username: createdUser.username,
      email: createdUser.email,
    },
  })
})

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

mongoose.connect(`mongodb://localhost/realworld`)

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`)
})
