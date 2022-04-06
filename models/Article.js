const mongoose = require("mongoose")

const articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, default: ""},
    description: { type: String, required: true },
    body: { type: String, required: true },
    tagList: [String],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    favorited: { type: Boolean, default: false },
    favoritesCount: { type: Number, default: 0 }
}, { timestamps: true })

const Article = mongoose.model("Article", articleSchema)

const createArticle = async (articleData) => {
    return await Article.create(articleData)
}

module.exports = { createArticle }