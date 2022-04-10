const express = require("express")

const { createNewArticle, getArticles } = require("../controllers/articles")

const router = express.Router()

router.post("/", createNewArticle)

router.get("/", getArticles)

module.exports = router