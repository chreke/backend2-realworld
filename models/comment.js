const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, lowercase: true },
    body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
)

const Comment = mongoose.model("Comment", commentSchema)

module.exports = { Comment }
