const mongoose = require("mongoose")

const articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, default: "" },
    description: { type: String, required: true },
    body: { type: String, required: true },
    tagList: [String],
    author: String,
    favorited: { type: Boolean, default: false },
    favoritesCount: { type: Number, default: 0 }
}, { timestamps: true })

const Article = mongoose.model("Article", articleSchema)

const createArticle = async (articleData) => {
    return await Article.create(articleData)
}

const getAllArticles = async (query) => {
    return await Article.find(query)
}

module.exports = { createArticle, getAllArticles }