const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const jwt = require("jsonwebtoken");

// const bodyParser = require("body-parser");

const { User } = require("./models/user");
const { Article } = require("./models/article")

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

const requireLogin = (req, res, next) => {
  if (req.user) {
    console.log("Logged In")
    next()
  } else {
    res.sendStatus(401);
  }
};

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/api/users", async (req, res) => {

  const { email, password, username } = req.body.user;
  let user = new User({ email, password, username });

  try {
    await user.save();
    const userId = user._id.toString();
    const token = jwt.sign(
      { userId, username: username },
      JWTSECRET,
      { expiresIn: "1 h", subject: userId }
    );
    console.log(token);
    await User.updateOne({ username: username }, { token: token })
    user = ({ email, password, username, token })
    res.json({ user });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/users/login", requireLogin, async (req, res) => {
  const { email, password } = req.body.user;
  const user = await User.login(email, password);
  if (user) {
    res.json({ user });
  } else {
    res.sendStatus(401);
  }
});

app.get("/api/articles", async (req, res) => {
  const articles = await Article
    .find({})
    .populate("author")
    .exec();
  //console.log({ articles });
  res.json({ articles });
});


app.post("/api/articles", async (req, res) => {
  const { title, description, body } = req.body.article
  const user = req.user
  console.log(user);
  const article = new Article({ title, description, body })
  await article.save()
  if (user) {
    res.json({ article })
  } else {
    res.sendStatus(401)
  }
})


mongoose.connect("mongodb://localhost/backend2_GroupProject");

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
