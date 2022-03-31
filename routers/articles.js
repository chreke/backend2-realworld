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

router.get("/", async (req, res) => {
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
    const tag = await Tag.findOne({ name: req.query.tag })
    query.tagList = tag._id
  }

  if (typeof req.query.favorited !== "undefined") {
    const user = await User.findOne({ username: req.query.favorited })
    query.favoritedBy = user._id
  }

  const author = await User.findOne({ username: req.query.author })

  if (author === null && req.query.author) {
    return res.json({ articles: [], articlesCount: 0 })
  } else if (author) {
    query.author = author._id
  }

  const articles = await Article.find(query)
    .limit(Number(limit))
    .skip(Number(offset))
    .sort({ createdAt: -1 })
    .populate("author")
    .populate("tagList")
    .exec()
  const articlesCount = await Article.count(query).exec()

  const processedArticles = Array.from(articles).map((article) => {
    const processedArticle = {
      ...article.toObject(),
      tagList: article.tagList.map((tag) => tag.name),
      favorited: article.favoritedBy.includes(req.user?.userId),
    }
    return processedArticle
  })

  res.json({
    articles: processedArticles,
    articlesCount: articlesCount,
  })
})

router.post("/:slug/favorite", async (req, res) => {
  const { slug } = req.params
  const article = await Article.findOneAndUpdate(
    { slug },
    { $addToSet: { favoritedBy: mongoose.Types.ObjectId(req.user.userId) } },
    { returnDocument: "after" }
  )
  res.json({
    article: {
      ...article.toObject(),
      favorited: true,
    },
  })
})

router.delete("/:slug/favorite", async (req, res) => {
  const { slug } = req.params
  const article = await Article.findOneAndUpdate(
    { slug },
    { $pull: { favoritedBy: req.user.userId } },
    { returnDocument: "after" }
  )
  res.json({
    article: {
      ...article.toObject(),
      favorited: false,
    },
  })
})

module.exports = router
