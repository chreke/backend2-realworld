const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
exports.Comment = Comment;