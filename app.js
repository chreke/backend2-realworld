const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const path = require("path");
const cors = require("cors")
const mongoose = require("mongoose")
const { authUser } = require("./controllers/auth");
const usersRouter = require("./routes/users");
const userRouter = require("./routes/user")
const articleRouter = require("./routes/articles")
const tagsRouter = require("./routes/tags")

const app = express()
const PORT = 3000;


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.use(express.json())
    app.use(cors())
    app.use(authUser)
    app.use(express.static("dist"));
    app.use("/api/users", usersRouter)
    app.use("/api/user", userRouter)
    app.use("/api/articles", articleRouter)
    app.use("/api/tags", tagsRouter)


    app.get("/", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });

    app.listen(PORT, () => {
      console.log(`Started Express server on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo connection error: ", err)
  })
