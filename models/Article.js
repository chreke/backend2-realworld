const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  body: { type: String },
  tagList: { type: Array },
});

const Article = mongoose.model("Article", articleSchema);

exports.Article = Article;
