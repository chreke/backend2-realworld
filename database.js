const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()


class Database {

    constructor() {
        this.connect()
    }

    connect() {
        mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Connected successfully to database")
        })
        .catch(() => {
            console.log("Error" + err)
        })
    }
}

module.exports = new Database()