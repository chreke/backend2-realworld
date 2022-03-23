const express = require("express");
const path = require("path");
const mongoose = require("mongoose")

const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1/real-world")
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
