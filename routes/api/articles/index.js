const { Router } = require("express");
const { User } = require("../../../models/userSchema");
const { Article } = require("../../../models/articleSchema");
const { Db } = require("mongodb");
const { requireLogin } = require("../../../token");

const route = Router();

route.use("/comments", require("./comments"));

// Get ALL articles
route.get("/", async (req, res) => {

    var articles = await Article.find();

    articlesCount = articles.length;

    // Add articlesCount field and value to articles
    articles = { articles }, articles.articlesCount = articlesCount;

    // console.log(articles)
    res.send(articles)

    // Dummy Data
    // res.send({
    //     "articles": [{
    //         "slug": "how-to-train-your-dragon",
    //         "title": "How to train your dragon",
    //         "description": "this is the description",
    //         "body": "This is the body",
    //         "tagList": ["dragons", "training"],
    //         "createdAt": new Date(),
    //         "updatedAt": new Date(),
    //         "favorited": false,
    //         "favoritesCount": 0,
    //         "author": {
    //             "username": "panos",
    //             "bio": "Hello there",
    //             "image": "https://st3.depositphotos.com/26608456/31707/i/450/depositphotos_317074692-stock-photo-cute-white-lama-with-black.jpg",
    //             "following": false
    //         }
    //     },
    //     {
    //         "slug": "how-to-train-your-dragon-2",
    //         "title": "How to train your dragon 2",
    //         "description": "this is the description",
    //         "body": "This is the body",
    //         "tagList": ["dragons", "training"],
    //         "createdAt": new Date(),
    //         "updatedAt": new Date(),
    //         "favorited": false,
    //         "favoritesCount": 0,
    //         "author": {
    //             "username": "panos",
    //             "bio": "Hello there",
    //             "image": "https://st3.depositphotos.com/26608456/31707/i/450/depositphotos_317074692-stock-photo-cute-white-lama-with-black.jpg",
    //             "following": false
    //         }
    //     }],
    //     "articlesCount": 2
    // })
})


// Get a single article
route.get("/:slug", async (req, res) => {

    var article = await Article.findOne({ slug: req.params.slug });
    res.send({ article })
    console.log("article:")
    console.log(article)

    // res.send({
    //     "article": {
    //         "slug": req.params.slug,
    //         "title": "How to train your dragon",
    //         "description": "this is the description",
    //         "body": "This is the body",
    //         "tagList": ["dragons", "training"],
    //         "createdAt": new Date(),
    //         "updatedAt": new Date(),
    //         "favorited": false,
    //         "favoritesCount": 0,
    //         "author": {
    //             "username": "panos",
    //             "bio": "Hello there",
    //             "image": "https://st3.depositphotos.com/26608456/31707/i/450/depositphotos_317074692-stock-photo-cute-white-lama-with-black.jpg",
    //             "following": false
    //         }
    //     }
    // })
})

// Get comments on article
route.get("/:slug/comments", (req, res) => {
    res.send({
        "comments": [
            {
                "id": 1,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "body": "This is the 1st comment's body",
                "author": {
                    "username": "panos",
                    "bio": "Hello there",
                    "image": "https://st3.depositphotos.com/26608456/31707/i/450/depositphotos_317074692-stock-photo-cute-white-lama-with-black.jpg",
                    "following": false
                }
            },
            {
                "id": 2,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "body": "This is the 2nd comment's body",
                "author": {
                    "username": "mary",
                    "bio": "Hello, I am Mary",
                    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXZCwR5JBTDBHaq9YzKXrxALwYzzxlSazJ1A&usqp=CAU",
                    "following": false
                }
            }
        ]
    })
})


// CREATE AN ARTICLE -- Doesn't have "favorited" property, "Author" property

route.post("/", requireLogin, async (req, res) => {
    // Lägger till user_id i article
    // req.user kommer från jwt token
    req.body.article.author = req.user.user_id


    // Skapar slug från artikel titel - https://sv.frwiki.wiki/wiki/Slug_%28journalisme%29
    let newSlug = req.body.article.title;
    newSlug = newSlug.replaceAll(' ', '-').toLowerCase()

    req.body.article.slug = newSlug
    const article = new Article(req.body.article)

    article.tagList.reverse(); // Reverses the order of the tags in the Array ? Varför reverse ? (V.)

    await article.save();
    res.send({ article });
    console.log("Create an article:")
})


// UPDATE AN ARTICLE
// It works but I can't identify the article I'm updating without being able to know which user is executing the PUT method
route.put("/:article", async (req, res) => {
    console.log("Update article PUT:");
    console.log("req")
    console.log(req.body)

    let slug = req.params.article
    console.log("slug:", slug)


    // https://mongoosejs.com/docs/tutorials/findoneandupdate.html
    const filter = { slug };
    const update = {
        body: req.body.article.body
    };
    var article = await Article.findOneAndUpdate(filter, update);
    res.send({ article });
})


// FAVORITE ARTICLE
route.post("/:article/favorite", async (req,res) => {

    console.log("Favorite article POST:");

    var article = await Article.findOne({slug});
    
    // For testing purposes
        // var articleId = "62514a9182197faaa9d4b03a"; 
        // await Article.findByIdAndUpdate({_id: articleId}, {favorited: true})
        // await Article.findByIdAndUpdate({_id: articleId}, {$inc : {favoritesCount: 1}});

    await Article.findByIdAndUpdate({_id: article._id}, {favorited: true})
    await Article.findByIdAndUpdate({_id: article._id}, {$inc : {favoritesCount: 1}});
    article = await Article.findById({_id: article._id});
    
    res.send({article});
    console.log("from FAVORITE ARTICLE POST: article")
    console.log(article)
    console.log("Favorite article POST END:");
})

// UNFAVORITE ARTICLE
route.delete("/:article/favorite", async (req,res) => {

    console.log("Unfavorite article DELETE:");

    var article = await Article.findOne({slug});

    // For testing purposes
        // var articleId = "62514a9182197faaa9d4b03a"; 
        // await Article.findByIdAndUpdate({_id: articleId}, {favorited: false})
        // await Article.findByIdAndUpdate({_id: articleId}, {$inc : {favoritesCount: -1}});

    await Article.findByIdAndUpdate({_id: article._id}, {favorited: false})
    await Article.findByIdAndUpdate({_id: article._id}, {$inc : {favoritesCount: -1}});
    article = await Article.findById({_id: article._id});
    res.send({article});
})


module.exports = route