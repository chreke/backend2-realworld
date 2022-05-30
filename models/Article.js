const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    description: { type: String },
    body: { type: String },
    tagList: { type: Array },
    slug: { type: Boolean, default: true },
    favorited: { type: Boolean, default: false },
    favoritesCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now},
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

exports.Article = Article;
