const { Router } = require("express")
const mongoose = require("mongoose")
const { Article } = require("../models/article")
const { Tag } = require("../models/tag")
const { filterUnique, lowerCase } = require("../utils")

const router = Router()

const saveTags = (tags) =>
  Promise.all(
    tags.map(async (tag) => {
      const savedTag = await Tag.findOneAndUpdate(
        { name: tag },
        { $set: { name: tag } },
        { upsert: true, returnDocument: "after" }
      )
      return savedTag._id
    })
  )

router.post("/", async (req, res) => {
  const { title, description, body, tagList } = req.body.article
  const { userId } = req.user

  const uniqueTags = filterUnique(tagList).map(lowerCase)
  const tags = await saveTags(uniqueTags)

  const article = new Article({
    title,
    description,
    body,
    tagList: tags,
    author: userId,
  })

  const savedArticle = await article.save()

  res.json({ article: savedArticle })
})

module.exports = router
