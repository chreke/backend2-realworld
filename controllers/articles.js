const { createArticle, getAllArticles, getSelectedArticles } = require("../models/Article")
const { getUserByUsername } = require("../models/User")

const createNewArticle = async (req, res) => {
    const { title, description, body, tagList } = req.body.article
    const articleData = {
        title,
        description,
        body,
        tagList,
        author: req.user.userId
    }
    const article = await createArticle(articleData)
    if (article) {
        res.json({ article })
    } else {
        res.sendStatus(400)
    }
}

const getArticles = async (req, res) => {
    const queryKey = Object.keys(req.query)[0]
    const queryValue = Object.values(req.query)[0]
    let articles = []
    if (queryKey === "author") {
        const user = await getUserByUsername(queryValue)
        articles = await getSelectedArticles({ author: user._id })
    } else if (queryKey === "tag") {
        articles = await getSelectedArticles({ tagList: { $in: queryValue } })
    } else if (!queryKey) {
        articles = await getAllArticles({})
    } else {
        res.sendStatus(404)
    }

    const articlesCount = articles.length

    if (articles) {
        res.json({ articles, articlesCount })
    } else {
        res.sendStatus(400)
    }
}

module.exports = { createNewArticle, getArticles }