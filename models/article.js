const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true },
    tagList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    favoritedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

articleSchema.virtual("favoritesCount").get(function () {
  return this.favoritedBy.length
})

const Article = mongoose.model("Article", articleSchema)

module.exports = { Article }
