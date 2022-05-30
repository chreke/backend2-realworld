const express = require("express");
const router = express.Router();

const { Article } = require("../models/article");
const { User } = require("../models/user");

router.get("/articles", async (req, res) => {
    let articlesCount = await Article.find().count();
    let queryParameters = {};

    if (req.query.tag !== undefined) {
        queryParameters = { tagList: req.query.tag }
    }
    else if (req.query.author !== undefined) {
        const user = await User.findOne({ username: req.query.author })
        queryParameters = { author: user._id }
    }
    console.log(queryParameters);
    let articles = await Article
        .find(queryParameters)
        .sort('-createdAt')
        .populate("author")
    res.json({ articles, articlesCount });

});

exports.router = router;


