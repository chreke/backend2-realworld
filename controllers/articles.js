const { createArticle, getAllArticles } = require("../models/Article")

const createNewArticle = async (req, res) => {
    const { title, description, body, tagList } = req.body.article
    const articleData = {
        title,
        description,
        body,
        tagList,
        author: req.user.username
    }
    const article = await createArticle(articleData)
    if (article) {
        res.json({ article })
    } else {
        res.sendStatus(400)
    }
}

const getArticles = async (req, res) => {
    const queryParam = Object.keys(req.query)[0]
    let articles = []
    if (queryParam === "author") {
        articles = await getAllArticles(req.query)
    } else if (queryParam === "tag") {
        articles = await getAllArticles({ tagList: { $in: Object.values(req.query)[0] } })
    } else {
        articles = await getAllArticles({})
    }

    const articlesCount = articles.length

    if (articles) {
        res.json({ articles, articlesCount })
    } else {
        res.sendStatus(400)
    }
}

module.exports = { createNewArticle, getArticles }