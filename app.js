const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const jwt = require("jsonwebtoken");

const { User } = require("./models/user");
const { Article } = require("./models/article")

const app = express();
const PORT = 3000;
const JWTSECRET = "lsdkjflsdjwerd2342fsdjfytsdas";

app.use(express.static("dist"));
app.use(express.json());

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
    next()
  } else {
    res.sendStatus(401);
  }
};

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/api/users", async (req, res) => {
  const bio = "";
  const image = null;
  const { email, password, username } = req.body.user;
  let user = new User({ email, password, username, bio, image });

  try {
    await user.save();
    const userId = user._id.toString();
    const token = jwt.sign(
      { userId, username: username },
      JWTSECRET,
      { expiresIn: "10 h", subject: userId }
    );
    await User.updateOne({ username: username }, { token: token })
    user = ({ email, password, username, token, bio, image })
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

app.get("/api/articles", async (req, res) => {
  let articlesCount = await Article.find().count();
  const articles = await Article
    .find({})
    .sort('-createdAt')
    .populate("author")
    .exec();
  //console.log({ articles });
  res.json({ articles, articlesCount });
});

function getTags(articles, articlesCount) {

  let tags = [];

  for (i = 0; i < articlesCount; i++) {
    if (articles[i].tagList.length === 0) {
      i++
    } else {
      for (j = 0; j < articles[i].tagList.length; j++) {
        tags.push(articles[i].tagList[j]);
      }
    }
  }

  function removeDuplicates(data) {
    return data.filter((value, index) => data.indexOf(value) === index);
  }
  tags = removeDuplicates(tags);
  return tags
}

app.get("/api/tags", async (req, res) => {
  let articlesCount = await Article.find().count();
  const articles = await Article
    .find({})
    .populate("author")
    .exec();
  tags = getTags(articles, articlesCount)
  res.json({ tags })
});

function slugTitle(title) {
  let slugTitle = "";
  array = title.toLowerCase().split(" ");
  lastChar = array[array.length - 1]
  map = array.map(item => item + "-");
  map.splice(map.length - 1, 1, lastChar);
  map.forEach(item => {
    slugTitle = slugTitle + item;
  })
  return slugTitle
};


app.post("/api/articles", requireLogin, async (req, res) => {
  const { title, description, body, tagList } = req.body.article
  const user = req.user
  let slug = slugTitle(title);
  const article = new Article({ title, description, body, author: user.userId, slug, tagList })
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
