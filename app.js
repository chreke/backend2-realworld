const express = require("express");
const path = require("path");
const passport = require("passport")
const session = require("express-session")
const { User } = require("./models/User")

const app = express()
const PORT = 3000;

app.use(express.static("dist"));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/register", (_req, res) => {
  res.send("test");
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(session({
    secret: "nemas",
    resave: false,
    saveUninitialized: false
  }));
app.use(passport.authenticate("session"));

app.post("/login", (_req, res) => {
  res.send("test");
});

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
