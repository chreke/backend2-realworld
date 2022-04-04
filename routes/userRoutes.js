const express = require("express");
const userRouter = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("../models/User");
const { userController } = require("../controllers/userController");
const {
  checkEmptyFields,
  validateUsernameAndEmail,
} = require("../middlewares/validation");
//const jwt = require("jsonwebtoken");
//const { authUser } = require("../controllers/auth");
const {login} = require("../models/User")
const { authUser, generateToken}= require("../controllers/auth")



const app = express();
app.use(express.json());
app.use(cors());
app.use(authUser)

userRouter.post("/", checkEmptyFields, validateUsernameAndEmail, (req, res) => {

  userController.userCreate(req, res);
  

});

userRouter.post("/login", async (req,res) =>{
    const { email, password } = req.body;
    const user = await login(email, password);
    if (user) {
      const token = await generateToken(user);
      console.log(user)
      res.json({ token });
    } else {
      res.sendStatus(401);
      
    }
})

userRouter.get("/user", authUser, (req, res)=>{
    const { username } = req.user;
    res.json({ username });
})

module.exports = userRouter;
