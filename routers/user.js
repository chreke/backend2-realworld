const { Router } = require("express")
const { User } = require("../models/user")
const { createUserToken } = require("../utils/auth")

const router = Router()

router.get("/", async (req, res) => {
  const user = req.user
  const { userId } = user
  const databaseUser = await User.findOne({ _id: userId })
  res.json({
    user: {
      email: user.email,
      token: req.token,
      username: databaseUser.username,
      bio: databaseUser.bio,
      image: databaseUser.image,
    },
  })
})

router.put("/", async (req, res) => {
  const { email, username, image, bio, password } = req.body.user
  const user = req.user

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: user.userId,
    },
    {
      email,
      password,
      bio,
      username,
      image,
    },
    { returnDocument: "after" }
  )

  res.json({
    user: {
      email: updatedUser.email,
      username: updatedUser.username,
      bio: updatedUser.bio,
      image: updatedUser.image,
      token: createUserToken(updatedUser),
    },
  })
})

module.exports = router
