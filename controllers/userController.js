const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const { User } = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' }); //expires in 30 days
};

//register user
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email,  } = req.body.user;

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = new User({
    username: username,
    password: password,
    email: email,
    bio: "",
    
    
  });

  const newUser = await user.save();

  //generate a token then pass it when a new user creates and login
  const token = generateToken(newUser._id);

  res.json({
    user: {
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      bio: "",
      

      token: token,
    },
  });
  //res.json({ message: 'Register User' }); //set up for initialize for test
});

//user login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body.user;
  const user = await User.findOne({ email });
  console.log(user);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    console.log(typeof token); //string

    return res.json({
      user: {
        username: user.username,
        password: user.password,
        email: user.email,
        token: token,
      
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid credential');
  }
});
module.exports = { registerUser, login };
