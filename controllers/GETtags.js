const express = require("express");
const router = express.Router();

const { Article } = require("../models/article")

function getTags(articles, articlesCount) {

    let tags = [];

    for (i = 0; i < articlesCount; i++) {
        if (articles[i].tagList.length === 0) {
            i++
        } else {
            for (j = 0; j < articles[i].tagList.length; j++) {
                tags.push(articles[i].tagList[j]);
            }
        }
    }

    function removeDuplicates(data) {
        return data.filter((value, index) => data.indexOf(value) === index);
    }
    tags = removeDuplicates(tags);
    return tags
}

router.get("/tags", async (req, res) => {
    let articlesCount = await Article.find().count();
    const articles = await Article
        .find({})
        .populate("author")
        .exec();
    tags = getTags(articles, articlesCount)
    res.json({ tags })
});

exports.router = router;