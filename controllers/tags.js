const { getAllTags } = require("../models/Tag")

const getTags = async (req, res) => {
    const tags = await getAllTags()

    if (tags) {
        res.json({ tags })
    } else {
        res.sendStatus(400)
    }
}

module.exports = { getTags }