const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const path = require("path");
const mongoose = require("mongoose")

const PORT = 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const app = express()

    app.use(express.static("dist"));

    app.get("/", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });

    app.listen(PORT, () => {
      console.log(`Started Express server on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo connection error: ", err)
  })
