const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const path = require("path");
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require("./routes/userRoutes");
const { authUser } = require("./controllers/auth");

const app = express()
const PORT = 3000;


mongoose.connect('mongodb://localhost:27017/real-world')
  .then(() => {
    app.use(express.json())
    app.use(cors())
    app.use(authUser)
    app.use(express.static("dist"));
    app.use("/api/users", userRouter)
    

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
