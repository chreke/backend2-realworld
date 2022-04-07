const jwt = require('jsonwebtoken');

// const protect = (req, res, next) => {
//   const authHeader = req.header('Authorization');
//   const token = authHeader.split(' ')[1];

//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) {
//       if (err) {
//         return res.status(400).send('error');
//       } else {
//         req.user_data = token_data;
//         next();
//       }
//     });
//   }
//   next();
// };
const authorizeUser = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
  
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    req.token = token;
    
    
  }
  next();
};
module.exports = { authorizeUser };
