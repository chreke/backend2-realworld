const { Router } = require("express")
const mongoose = require("mongoose")
const { User } = require("../models/user")

const router = Router()

router.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
  res.json({
    profile: {
      username: user.username,
      image: user.image,
      bio: user.bio,
    },
  })
})

module.exports = router
