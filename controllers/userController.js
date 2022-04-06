const { createUser } = require("../models/User")


const userController = {
    userCreate: async (req, res) => {
        const user = await createUser(req.body.user)
        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(400).json({ message: "Couldn't create user" })
        }
    }
}





module.exports = { userController}