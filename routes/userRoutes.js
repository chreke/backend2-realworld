const express = require("express")
const userRouter = express.Router()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('../models/User')
const { userController } = require("../controllers/userController")
const { checkEmptyFields, validateUsernameAndEmail } = require("../middlewares/validation")
const jwt = require ('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(cors())

userRouter.post("/", checkEmptyFields, validateUsernameAndEmail, (req, res) => {
    userController.userCreate(req, res)
})
//user
userRouter.post("/api/users", async (req,  res) =>{
    console.log(req.body)
   try {
       const user = await User.createUser({
        username : req.body.username,
        email: req.body.email,
        password: req.body.password,
       })
       res.json({status:'ok'})
    }catch(err){
          console.log(err)
        res.json({status: 'error', error: 'Duplicate email'})
    }
})
//login
userRouter.post("/api/users/login", async (req, res) => {
    
    const user = await User.findOne({
        username: req.body.username,
        
        })
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        if(isPasswordValid) {

            const token = jwt.sign(
                { 
                    username: user.username,
                    
                }, 
                'secret123'
                )
                
            console.log(token)
            return res.json({ status: 'OK', user: token})
        } else {
            return res.json({ status: 'error', user: false})
        }

})
     
    



    


module.exports = userRouter