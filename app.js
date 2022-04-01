const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const user = require("./routes/user")

const { User } = require("./models/user");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

// app.get("/", (_req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// app.use(express.static(path.join(__dirname, "dist", "index.html")));
app.use(express.static("dist"));

app.post("/users", async (req, res) => {
  const { username, password, email } = req.body.user;   
  const user = new User({ username, password, email });
  await user.save();
  res.send(req.body);
});
app.get("users", async (req, res) => {
  const user = User.find({})
})

app.use("/", user)

mongoose.connect(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});

//register - http://localhost:3000/api/users
//login - http://localhost:3000/api/users/login
//tags - http://localhost:3000/api/tags
//articles - http://localhost:3000/api/articles?limit=10&offset=0
