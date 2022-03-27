const { Router } = require("express")
const mongoose = require("mongoose")
const { Article } = require("../models/article")
const { Tag } = require("../models/tag")
const { filterUnique, lowerCase } = require("../utils")
const slugify = require("slugify")
const { User } = require("../models/user")

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
  const slug = slugify(title)
  const article = new Article({
    title,
    description,
    body,
    tagList: tags,
    author: userId,
    slug: slug,
  })

  const savedArticle = await article.save()

  res.json({ article: savedArticle })
})

router.get("/", async (req, res, next) => {
  let query = {}
  let limit = 10
  let offset = 0

  if (typeof req.query.limit !== "undefined") {
    limit = req.query.limit
  }
  if (typeof req.query.offset !== "undefined") {
    offset = req.query.offset
  }
  if (typeof req.query.tag !== "undefined") {
    const tag = await Tag.findOne({ name: req.query.tag }) // .find
    query.tagList = tag._id
  }

  const author = await User.findOne({ username: req.query.author })
  if (author) {
    query.author = author._id
  }
  //console.log(author) // fails test "Articles by Author"

  const articles = await Article.find(query)
    .limit(Number(limit))
    .skip(Number(offset))
    .sort({ createdAt: -1 })
    .populate("author")
    .exec()
  const articlesCount = await Article.count(query).exec()

  res.json({
    articles: articles,
    articlesCount: articlesCount,
  })
})

module.exports = router
