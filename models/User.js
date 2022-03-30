const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    biography: String,
    imageUrl: String
})

userSchema.pre("save", async () => {

})

const User = mongoose.model("User", userSchema)

const createUser = async (userData) => {
    const user = new User(userData)
    await user.save()
    return user
}

module.exports = { createUser }