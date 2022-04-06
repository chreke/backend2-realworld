const {createArticle, getAllArticle, findArticlesQuery, findOneArticle, findOneAndUpdateArticle, favoriteArticle, unFavoriteArticle} = require("../models/article")
exports.article_Create = async function(req, res, next) {
    const article = await createArticle(req.body.article, req.user)
    res.json({article})
}
exports.get_Article = async function(req, res, next) {
        /* const articles = await getAllArticle() */
        /* let articlesCount = articles.length
        res.json({articles, articlesCount}) */
        const articles = await findArticlesQuery(req.query)
        let articlesCount = articles.length
        res.json({articles, articlesCount}) 
     
}
exports.find_Article_Slug = async function(req, res, next) {
    const article = await findOneArticle(req.params.slug)
    res.json({article})
}
exports.updateArticle = async function(req, res, next){
    const article = await findOneAndUpdateArticle(req.params.slug, req.body.article)
    res.json({article})
}
exports.favorite_Article = async function(req, res, next){
    const article = await favoriteArticle(req.params)
    res.json({article})
}
exports.unFavorite_Article = async function(req, res, next) {
    const article = await unFavoriteArticle(req.params)
    res.json({article})
}