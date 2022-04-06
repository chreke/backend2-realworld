const { Router } = require("express");

const route = Router();

// Tried to move the file to routes folder and add the line below, but got error MODULE_NOT_FOUND
// route.use('/api', require('./api'));

route.use("/users", require("./users"));
route.use("/user", require("./user"));
route.use("/profiles", require("./profiles"));
route.use("/tags", require("./tags"));
route.use("/articles", require("./articles"));


module.exports = route

// For routes like /articles/comments, deal with this inside /atricles/index.js - not here. 
// We'll only require 1-level routes, not 2-level ones.