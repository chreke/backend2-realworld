const { createArticle } = require("../models/Article")

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
        res.json({article})
    } else {
        res.sendStatus(400)
    }
}

module.exports = { createNewArticle }