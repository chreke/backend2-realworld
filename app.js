const express = require("express");
const app = express()
const PORT = 3000;
const path = require("path");

// Connection to MongoDB Atlas
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://panos:123@realworld-gruppuppgift.qxob6.mongodb.net/realworld-gruppuppgift?retryWrites=true&w=majority")
.then(() => {
  console.log("Connection to MongoDB successful");
})
.catch((err) => {
  console.log("Connection to MongoDB error " + err);
})

// For POST requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ROUTES
app.use("/", require("./routes/api"));


app.use(express.static("dist"));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
