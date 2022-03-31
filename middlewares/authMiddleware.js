const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) {
      if (err) {
        return res.status(400).send('error');
      } else {
        req.user_data = token_data;

        next();
      }
    });
  }

  if (!token) {
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
