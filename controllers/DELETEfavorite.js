const express = require("express");
const router = express.Router();

const { Article } = require("../models/article")

const requireLogin = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401);
    }
};

router.delete("/articles/:slug/favorite", requireLogin, async (req, res) => {
    console.log("HÄRdelete")
    let favorite = req.params.slug;
    console.log(favorite);
    await Article.updateOne({ slug: favorite }, { favorited: false, favoritesCount: 0 })
    let article = await Article
        .find({ slug: favorite })
        .sort('-createdAt')
        .populate("author")
        .exec();
    article = article[0];
    res.json({ article });
    console.log(article);
})


exports.router = router;