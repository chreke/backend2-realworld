const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://panos:123@realworld-gruppuppgift.qxob6.mongodb.net/realworld-gruppuppgift?retryWrites=true&w=majority")
.then(() => {
  console.log("Connection to MongoDB successful");
})
.catch((err) => {
  console.log("Connection to MongoDB error " + err);
})

const app = express()
const PORT = 3000;

app.use(express.static("dist"));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
