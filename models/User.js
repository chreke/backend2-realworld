const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    biography: String,
    imageUrl: String
})

userSchema.pre("save", async () => {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const User = mongoose.model("User", userSchema)

const createUser = async (userData) => {
    const user = new User(userData)
    await user.save()
    return user
}

module.exports = { createUser }