const { Router } = require("express")
const mongoose = require("mongoose")
const { Tag } = require("../models/tag")

const router = Router()

router.get("/", async (req, res) => {
  const tags = await Tag.find()
  res.json({ tags: tags.map((tag) => tag.name) })
})

module.exports = router
