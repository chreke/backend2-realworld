const { getUserByUsername } = require("../models/User")

module.exports = {
    checkEmptyFields: (req, res, next) => {
        let fieldsValid = true
        Object.values(req.body.user).forEach(value => {
            if (!value) {
                fieldsValid = false
            }
        })
        if (fieldsValid) {
            next()
        } else {
            res.status(400).json({ message: "All fields requiered" })
        }
    },
    validateUsernameAndEmail: async (req, res, next) => {
        const username = req.body.user.username
        const email = req.body.user.email

        const user = getUserByUsername(username)

        if (user) {
            if (username.toLowerCase() === user.username) {
                res.status(400).json({ message: "Username already exists" })
            } else if (email.toLowerCase() === user.email) {
                res.status(400).json({ message: "Email already exists" })
            } else {
                next()
            }
        } else (
            next()
        )
    }
}