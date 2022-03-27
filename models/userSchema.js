const mongoose = require("mongoose"); // Adds a connection to our MongoDB db


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        // default: "no email given",
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        // default: "no username given",
    },
    password: {
        type: String,
        required: true,
        // default: "no password given",
    },
    bio: {
        type: String,
        default: "Enter bio",
    },
    image: {
        type: String,
        default: "https://static.productionready.io/images/smiley-cyrus.jpg",
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
exports.User = User;


