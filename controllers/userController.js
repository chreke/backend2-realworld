const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const { User } = require('../models/User');
const { redirect } = require('express/lib/response');

const generateToken = (user) => {
  const userId = user._id.toString();
  return (token = jwt.sign(
    { userId, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d', subject: userId }
  )); //expires in 30 days
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
    image: 'https://i.stack.imgur.com/34AD2.jpg',
  });

  const newUser = await user.save();

  //generate a token then pass it when a new user creates and login
  const token = generateToken(newUser);

  res.json({
    user: {
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      bio: newUser.bio,
      image: newUser.image,
      token: token,
    },
  });
});

//user login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body.user;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user);
    console.log(typeof token); //string

    return res.json({
      user: {
        username: user.username,
        password: user.password,
        email: user.email,
        bio: '',
        image: user.image,

        token: token,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid credential');
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log(user);
  const { userId } = user;
  const currentUser = await User.findOne({ _id: userId });

  res.json({
    user: {
      username: currentUser.username,
      image: currentUser.image,
      email: currentUser.email,
      bio: currentUser.bio,
      token: req.token,
    },
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = req.user;
  const { userId } = user;

  let password = req.body.user.password;

  const hash = await bcrypt.hash(password, 10);
  password = hash;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      image: req.body.user.image,
      username: req.body.user.username,
      email: req.body.user.email,
      bio: req.body.user.bio,
      password,
    },
    { new: true }
  );

  res.json({
    user: {
      image: updatedUser.image,
      username: updatedUser.username,
      email: updatedUser.email,
      bio: updatedUser.bio,
      token: req.token,
    },
  });
});

const getProfile = asyncHandler(async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username });
  console.log(username);
  res.json({
    profile: {
      username: user.username,
      bio: user.bio,
      image: user.image,
    },
  });
});
module.exports = { registerUser, login, getMe, getProfile, updateUser };
