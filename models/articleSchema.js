const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    slug: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    body: {
        type: String,
        required: true,
    },

}, { timestamps: true })

const Article = mongoose.model("Article", articleSchema);
exports.Article = Article;