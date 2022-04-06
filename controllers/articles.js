const express = require("express");
const router = express.Router();

const { Article } = require("../models/article")


router.get("/articles", async (req, res) => {
    let articlesCount = await Article.find().count();
    let queryParameters = {};
    if (req.query.tag !== undefined) {
        queryParameters = { tagList: req.query.tag }
    }
    const articles = await Article
        .find(queryParameters)
        .sort('-createdAt')
        .populate("author")
        .exec();
    res.json({ articles, articlesCount });
});

exports.router = router;