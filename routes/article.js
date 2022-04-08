const express = require("express")
const { article_Create, get_Article, find_Article_Slug, updateArticle, favorite_Article, unFavorite_Article, delete_Article } = require("../controllers/articleController")

const router = express.Router()

router.post("/", article_Create)
router.get("/", get_Article)
router.delete("/:slug", delete_Article)
router.get("/:slug", find_Article_Slug)
router.put("/:slug", updateArticle)
router.post("/:slug/favorite", favorite_Article)
router.delete("/:slug/favorite", unFavorite_Article)
module.exports = router 