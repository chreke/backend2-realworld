const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const { User } = require("./models/User");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/register", async (_req, res) => {
  const {email, password, username} = req.body
  try {
  
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(
  session({
    secret: "nemas",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));

app.post("/login", (_req, res) => {
  res.send("test");
});

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});

//establish connection to database
mongoose.connect(
  "mongodb+srv://annarylander:@cluster0.fjx89.mongodb.net/realworld",
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) return console.log("Error: ", err);
    console.log(
      "MongoDB Connection -- Ready state is:",
      mongoose.connection.readyState
    );
  }
);
