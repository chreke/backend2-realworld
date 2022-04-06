const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");

const { User } = require("./models/user");
const { Article } = require("./models/article")
// const { Comment } = require("./models/comment")asdas

const app = express();
const PORT = 3000;
const JWTSECRET = "lsdkjflsdjwerd2342fsdjfytsdas";

const profileRouter = require("./controllers/profile").router;
const userRouter = require("./controllers/user").router;
const articlesRouter = require("./controllers/articles").router;
const tagsRouter = require("./controllers/tags").router;
const slugRouter = require("./controllers/slug").router;

app.use(express.static("dist"));
app.use(express.json());

app.use("/api", profileRouter);
// app.use("/", userRouter);
app.use("/api", articlesRouter);
app.use("/api", tagsRouter);
app.use("/api", slugRouter);

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

app.get("/api/user", async (req, res) => {
  userLoggedIn = req.user;
  let user = await User
    .find({ _id: req.user.userId })
    .exec()
  email = user[0].email;
  token = user[0].token;
  username = user[0].username;
  bio = user[0].bio;
  image = user[0].image;
  user = ({ user, username, token, bio, image })
  res.json({ user })
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
      { expiresIn: "2 h", subject: userId }
    );
    await User.updateOne({ username: username }, { token: token })
    user = ({ email, username, token, bio, image })
    res.json({ user });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body.user;
  let user = await User.login(email, password);
  if (user) {
    const userId = user._id.toString();
    const token = jwt.sign(
      { userId, username: user.username },
      JWTSECRET,
      { expiresIn: "2 h", subject: userId }
    );
    await User.updateOne({ username: user.username }, { token: token })
    username = user.username;
    bio = user.bio;
    image = user.image;
    user = ({ email, username, token, bio, image })
    res.json({ user });
  } else {
    res.sendStatus(401);
  }
});

// app.get("/api/articles", async (req, res) => {
//   let articlesCount = await Article.find().count();
//   let queryParameters = {};
//   if (req.query.tag !== undefined) {
//     queryParameters = { tagList: req.query.tag }
//   }
//   const articles = await Article
//     .find(queryParameters)
//     .sort('-createdAt')
//     .populate("author")
//     .exec();
//   res.json({ articles, articlesCount });
// });

// function getTags(articles, articlesCount) {

//   let tags = [];

//   for (i = 0; i < articlesCount; i++) {
//     if (articles[i].tagList.length === 0) {
//       i++
//     } else {
//       for (j = 0; j < articles[i].tagList.length; j++) {
//         tags.push(articles[i].tagList[j]);
//       }
//     }
//   }

//   function removeDuplicates(data) {
//     return data.filter((value, index) => data.indexOf(value) === index);
//   }
//   tags = removeDuplicates(tags);
//   return tags
// }

// app.get("/api/tags", async (req, res) => {
//   let articlesCount = await Article.find().count();
//   const articles = await Article
//     .find({})
//     .populate("author")
//     .exec();
//   tags = getTags(articles, articlesCount)
//   res.json({ tags })
// });

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
  const article = new Article({ title, description, body, author: user.userId, slug, tagList: tagList.sort() })
  await article.save()
  if (user) {
    res.json({ article })
  } else {
    res.sendStatus(401)
  }
})

// app.get("/api/articles/:slug", async (req, res) => {
//   const slug = req.params.slug;
//   let article = await Article
//     .find({ slug: slug })
//     .populate("author")
//     .exec()
//   article = article[0];

//   res.json({ article })
// })

// app.post("/api/articles/:slug/comments", async (req, res) => {
//   const { body } = req.body.comment;
//   const user = req.user;
//   const comment = new Comment({ body, author: user.userId })
//   await comment.save();
//   if (user) {
//     res.json({ comment });
//   } else {
//     res.sendStatus(401);
//   }
// })

app.put("/api/user", requireLogin, async (req, res) => {
  const { email, username, image, bio } = req.body.user
  const { password } = req.body.user

  const user = req.user.userId
  const filter = { _id: `${user}` }

  console.log(email, username, password, image, bio)
  console.log(user)

  User.findOneAndUpdate(filter, { $set: { email: email, username: username, password: password, image: image, bio: bio } }, { new: true }, (err, doc) => {
    if (err) {
      console.log("Something wrong when updating data!")
    }
    res.redirect("/api/")
  })
})

//tets

mongoose.connect("mongodb://localhost/backend2_GroupProject");

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
