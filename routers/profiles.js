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

router.post("/:username/follow", async (req, res) => {
  const followedUser = await User.findOneAndUpdate(
    { username: req.params.username },
    { $addToSet: { followedBy: mongoose.Types.ObjectId(req.user.userId) } },
    { returnDocument: "after" }
  )
  await User.updateOne(
    { _id: req.user.userId },
    {
      $addToSet: { follows: followedUser._id },
    }
  )
  res.json({
    profile: {
      username: followedUser.username,
      image: followedUser.image,
      bio: followedUser.bio,
      following: true,
    },
  })
})

router.delete("/:username/follow", async (req, res) => {
  const followedUser = await User.findOneAndUpdate(
    { username: req.params.username },
    { $pull: { followedBy: req.user.userId } },
    { returnDocument: "after" }
  )
  await User.updateOne(
    { _id: req.user.userId },
    {
      $pull: { follows: followedUser._id },
    }
  )
  res.json({
    profile: {
      username: followedUser.username,
      image: followedUser.image,
      bio: followedUser.bio,
      following: false,
    },
  })
})

module.exports = router
