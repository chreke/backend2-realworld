const mongoose = require("mongoose");
const { stringify } = require("querystring");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String }
});

module.exports = mongoose.model("User", userSchema);