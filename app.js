const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const { User } = require("./models/User");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("dist"));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/users", async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body.user;
  console.log("username", username);
  try {
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Problem to register" });
  }
});

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body.user;
  console.log(req.body);
  const user = await User.login(email, password);
  if (user) {
    const userId = user._id.toString();
    const token = jwt.sign(
      { userId, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "60h",
        subject: userId,
      }
    );
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

mongoose.connect("mongodb://localhost/realworld");
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
