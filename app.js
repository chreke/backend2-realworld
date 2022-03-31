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

  const bio = "";
  const image = null;
  const { email, password, username } = req.body.user;

  const token = jwt.sign(
    { username: username },
    JWTSECRET,
    { expiresIn: "1 h", subject: username }
  );
  const user = new User({ email, password, username, bio, image, token });
  try {
    await user.save();
    console.log({ user });
    res.json({ user });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body.user;
  const user = await User.login(email, password);
  if (user) {
    res.json({ user });
  } else {
    res.sendStatus(401);
  }
});

mongoose.connect("mongodb://localhost/backend2_GroupProject");

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
