const express = require("express")

const { createNewArticle } = require("../controllers/articles")

const router = express.Router()

router.post("/", createNewArticle)

module.exports = router