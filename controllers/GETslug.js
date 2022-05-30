const express = require("express");
const router = express.Router();

const { Article } = require("../models/article")

router.get("/articles/:slug", async (req, res) => {
    const slug = req.params.slug;
    let article = await Article
        .find({ slug: slug })
        .populate("author")
        .exec()
    article = article[0];

    res.json({ article })
});

exports.router = router;  