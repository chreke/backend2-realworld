const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { User } = require("./models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const JWTSECRET = "0+9234lkandfsvoinå+päqngodflnvaölsdk09p32";

app.use(express.static("dist"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
  try {
    // const { username, password, email } = req.body;

    // const encryptedPassword = await bcrypt.hash(password);

    // const user = await User.create({
    //   username,
    //   password: encryptedPassword,
    //   email,
    // });
    // const token = jwt.sign({ user_id: user._id, username }, JWTSECRET, {
    //   expiresIn: "1h",
    // });
    // user.token = token;
    // res.status(201).json(user);
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    console.log(user);
    await user.save();
    res.json({ username, email });
  } catch (err) {
    console.log(err);
  }
});

mongoose.connect("mongodb://localhost/backend2_GroupProject");
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
