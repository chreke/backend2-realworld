const { getUserByUsername } = require("../models/User")

const getUser = async (req, res) => {
    const user = await getUserByUsername(req.user.username)
    if (user) {
        res.json({ user })
    } else {
        res.sendStatus(400)
    }
}

module.exports = { getUser }