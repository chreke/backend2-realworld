const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema({
    tag: { type: String, required: true }
})

const Tag = mongoose.model("Tag", tagSchema)

const getAllTags = async () => {
    return await Tag.find()
}

module.exports = { getAllTags }