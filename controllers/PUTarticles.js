const express = require("express");
const router = express.Router();

const { Article } = require("../models/article");

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


router.put("/articles/:slug", requireLogin, async (req, res) => {
    const { title, description, body, slug } = req.body.article

    console.log(title, description, body)

    const filter = {"slug": slug }
    let newSlug = slugTitle(title);

    Article.findOneAndUpdate(filter, {$set: {title, description, body, slug: newSlug}}, {new: true}, (err, doc) => {
        // res.json({ article })
        if (err) {
            console.log("Something wrong when updating data!");
        }
        // res.redirect("/articles")
    })
  })


exports.router = router;