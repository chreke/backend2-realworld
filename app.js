const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const jwt = require("jsonwebtoken");

// const bodyParser = require("body-parser");

const { User } = require("./models/user");

const app = express();
const PORT = 3000;
const JWTSECRET = "lsdkjflsdjwerd2342fsdjfytsdas";

app.use(express.static("dist"));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, JWTSECRET);
  }
  next();
});


app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


app.post("/api/users", async (req, res) => {
  // console.log(req.body);
  // const newUser = req.body;
  // console.log(newUser.user.email);
  const { email, password, username } = req.body.user;
  console.log(email)
  const user = new User({ email, password, username });
  try {
    await user.save();
    res.json({ user });
  } catch (err) {
    console.log(err);
  }
});

mongoose.connect("mongodb://localhost/backend2_GroupProject");

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
