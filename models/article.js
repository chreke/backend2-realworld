const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema(
    {
        slug: { type: String },
        title: { type: String, required: true },
        description: { type: String, required: true },
        body: { type: String, required: true },
        tagList: { type: Array, default: [] },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        favorited: { type: Boolean, default: false },
        favoritesCount: { type: Number, default: 0 },
        author: { type: mongoose.Schema.ObjectId, ref: "User" }
    })

const Article = mongoose.model("Article", articleSchema);
exports.Article = Article;