const express = require("express");
const router = express.Router();

const { Article } = require("../models/article");
const { User } = require("../models/user");

router.get("/articles", async (req, res) => {
    let articlesCount = await Article.find().count();
    let articles = {};

    if (req.query.tag !== undefined) {
        articles = await Article
            .find({ tagList: req.query.tag })
            .sort('-createdAt')
            .populate("author")
            .exec()
    }
    else if (req.query.author !== undefined) {
        const user = await User.findOne({ username: req.query.author })
        articles = await Article.find({ author: user._id })

    } else {
        articles = await Article
            .find({})
            .sort('-createdAt')
            .populate("author")
            .exec()
    }
    res.json({ articles, articlesCount });

});

exports.router = router;