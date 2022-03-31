const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        body: {type: String, required: true},
        tagList: {type: Array, 'default': []}
    })

const Article = mongoose.model("Article", articleSchema);
exports.Article = Article;