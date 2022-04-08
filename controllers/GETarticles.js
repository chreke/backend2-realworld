const express = require("express");
const router = express.Router();

const { Article } = require("../models/article")


router.get("/articles", async (req, res) => {
    let articlesCount = await Article.find().count();
    let queryParameters = {};
    console.log(req.query);
    console.log(req.query.author);
    if (req.query.tag !== undefined) {
        queryParameters = { tagList: req.query.tag }
    }
    // else if (req.query.author !== undefined) {
    //     queryParameters = { author: { username: req.query.author } }
    // }
    //console.log(author);
    console.log(queryParameters);
    const articles = await Article
        .find(queryParameters)
        .sort('-createdAt')
        .populate("author")
        .exec();
    res.json({ articles, articlesCount });
    //console.log(articles)
});

exports.router = router;