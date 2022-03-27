const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    biography: String,
    imageUrl: String
})

module.exports = mongoose.Model("User", userSchema)