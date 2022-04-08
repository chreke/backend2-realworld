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

function slugTitle(title) {
    let slugTitle = "";
    array = title.toLowerCase().split(" ");
    lastChar = array[array.length - 1]
    map = array.map(item => item + "-");
    map.splice(map.length - 1, 1, lastChar);
    map.forEach(item => {
        slugTitle = slugTitle + item;
    })
    return slugTitle
};


router.post("/articles", requireLogin, async (req, res) => {
    const { title, description, body, tagList } = req.body.article
    const user = req.user
    let slug = slugTitle(title);
    const article = new Article({ title, description, body, author: user.userId, slug, tagList: tagList.sort() })
    await article.save()
    if (user) {
        res.json({ article })
    } else {
        res.sendStatus(401)
    }
});

exports.router = router;