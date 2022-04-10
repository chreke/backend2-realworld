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

router.post("/articles/:slug/favorite", requireLogin, async (req, res) => {
    console.log("FAVORIT")
    let favorite = req.params.slug;
    console.log(req.user);
    console.log(favorite);
    let article = await Article.updateOne({ slug: favorite }, { favorited: true, favoritesCount: +1 })
    // let article = await Article
    //     .find({ slug: favorite })
    //     .sort('-createdAt')
    //     .populate("author")
    //     .exec();
    // article = article[0];
    //console.log(article)
    res.json({ article });
    // console.log(article)
})


exports.router = router;