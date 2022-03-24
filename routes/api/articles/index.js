const { Router } = require("express");

const route = Router();

route.use("/comments", require("./comments"));

// Get ALL articles
route.get("/", (req, res) =>{
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
        }],
        "articlesCount": 2
    })
})


// Get a single article
route.get("/:slug", (req, res) => {
    res.send({
        "article": {
            "slug": req.params.slug,
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
        }
    })
})

// Get comments on article

module.exports = route