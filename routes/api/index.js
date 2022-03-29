const { Router } = require("express");

const route = Router();

// Tried to move the file to routes folder and add the line below, but got error MODULE_NOT_FOUND
// route.use('/api', require('./api'));

route.use("/users", require("./users"));
route.use("/user", require("./user"));
route.use("/profiles", require("./profiles"));
route.use("/tags", require("./tags"));
route.use("/articles", require("./articles"));

// Get ALL articles
route.get("/articles", (req, res) =>{
    res.send({
        "articles": [{
            "slug": "how-to-train-your-dragon",
            "title": "How to train your dragon",
            "description": "this is the description",
            "body": "This is the body",
            "tagList": ["dragons", "training"],
            "createdAt": "2022-03-24",
            "updatedAt": "2022-03-25",
            "favorited": false,
            "favoritesCount": 0,
            "author": {
                "username": "panos",
                "bio": "Hello there",
                "image": "https://st3.depositphotos.com/26608456/31707/i/450/depositphotos_317074692-stock-photo-cute-white-lama-with-black.jpg",
                "following": false
            }
        },
        {
            "slug": "how-to-train-your-dragon-2",
            "title": "How to train your dragon 2",
            "description": "this is the description",
            "body": "This is the body",
            "tagList": ["dragons", "training"],
            "createdAt": "2022-03-24",
            "updatedAt": "2022-03-25",
            "favorited": false,
            "favoritesCount": 0,
            "author": {
                "username": "panos",
                "bio": "Hello there",
                "image": "https://st3.depositphotos.com/26608456/31707/i/450/depositphotos_317074692-stock-photo-cute-white-lama-with-black.jpg",
                "following": false
            }
        },
        {
            "slug": "how-to-train-your-dragon-3",
            "title": "How to train your dragon 3",
            "description": "this is the description",
            "body": "This is the body",
            "tagList": ["dragons", "training"],
            "createdAt": "2022-03-24",
            "updatedAt": "2022-03-25",
            "favorited": false,
            "favoritesCount": 0,
            "author": {
                "username": "panos",
                "bio": "Hello there",
                "image": "https://st3.depositphotos.com/26608456/31707/i/450/depositphotos_317074692-stock-photo-cute-white-lama-with-black.jpg",
                "following": false
            }
        }],
        "articlesCount": 3
    })
})


module.exports = route

// For routes like /articles/comments, deal with this inside /atricles/index.js - not here. 
// We'll only require 1-level routes, not 2-level ones.