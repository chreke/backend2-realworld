const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express()
const PORT = 3000;

app.use(express.static("dist"));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


mongoose.connect("mongodb://localhost/backend2_GroupProject");
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
