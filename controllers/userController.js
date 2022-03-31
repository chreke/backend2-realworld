const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const { User } = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' }); //expires in 30 days
};

// const user = asyncHandler(async (req, user, next) => {
//   const authHeader = req.header('Authorization');
//   const token = authHeader.split(' ')[1];
//   if (authHeader) {
//     req.user = jwt.verify(token, process.env.JWT_SECRET);
//   }
//   next();
// });

//register user
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body.user;

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = new User({
    username: username,
    password: password,
    email: email,
    bio: '',
  });

  const newUser = await user.save();

  //generate a token then pass it when a new user creates and login
  const token = generateToken(newUser._id);

  res.json({
    user: {
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      bio: '',
      image: '',
      token: token,
    },
  });
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
        image: '',
        bio: '',
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid credential');
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user);
  const authHeader = req.header('Authorization');
  const token = authHeader.split(' ')[1];
  //console.log(user);

  res.json({
    user: {
      id: user.id,
      username: user.username,
      image: user.image,
      email: user.email,
      bio: '',
      token: token,
    },
  });
});

const updateUser = asyncHandler(async (req, res) => {
  console.log('old', req.body.user);
  console.log('req.body.user', req.body.user);
  const authHeader = req.header('Authorization');
  const token = authHeader.split(' ')[1];

  const updatedUser = await User.findOneAndUpdate(req.user, req.body.user, {
    new: true,
  });
  //console.log(updatedUser);

  res.json({
    user: {
      username: updatedUser.username,
      email: updatedUser.email,
      bio: updatedUser.bio,
      image: updatedUser.image,
      token: token,
    },
  });
});

const getProfile = asyncHandler(async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username });
  console.log(user);
  res.json({
    profile: {
      username: user.username,
      bio: user.bio,
      image: user.image,
    },
  });
});
module.exports = { registerUser, login, getMe, updateUser, getProfile };
