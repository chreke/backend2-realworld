const req = require("express/lib/request")
const res = require("express/lib/response")
const mongoose = require("mongoose")
const articleSchema = mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    body: {type: String, required: true},
    description: {type: String, required: true},
    favorited:[
        {
            username: String,
            type: Boolean, default: false
        }
    ],
    favoritesCount: {type: Number, default: 0},
    author: {type: String},
    tagList: [],
}, {timestamps: true})

const Article = mongoose.model("Article", articleSchema)

const createArticle = async (article, user) => {
    article.author = user.username
    article.slug = article.title
    return await Article.create(article)
}
const getAllArticle = async() => {
    return await Article.find()  
}
const findArticlesQuery = async(query) => {
    if(query.tag !== undefined){
        return await Article.find({tagList: query.tag})
    } else if(query.author !== undefined){
        return await Article.find(query)
    }else if (query.favorited !== undefined){
        return await Article.find(query)
    }else {
        return await Article.find()
    }
    
}
const findOneArticle = async(slug) => {
    return await Article.findOne({slug: slug})
}
const findOneAndUpdateArticle = async(slug, article) => {
    console.log(article)
    return await Article.findOneAndUpdate({slug: slug}, article, {new: true})
}
const findAllTags = async() => {
    return await Article.find().select({tagList: true, _id: false})
} 
const favoriteArticle = async(slug, req) => {
    const article = await Article.findOne(slug)
    console.log(req.user)
    if(article.favorited === true){
        return "you have already Liked"
    }
    return await Article.findOneAndUpdate(slug, {favoritedCounts: {$size: "$favorited"}, favorited: req.user.username})
    /* return await Article.findOneAndUpdate(slug, {$inc: {favoritesCount: +1}, favorited: true}, {new: true}) */
}
const unFavoriteArticle = async(slug, req) => {
    const article = await Article.findOne(slug)
    if(article.favorited === false){
        return "you have already unliked"
    }
    /* return await Article.findOneAndUpdate(slug, {$inc: {favoritesCount: -1}, favorited: false}, {new: true}) */
    return await Article.findOneAndUpdate(slug, {favoritedCounts: {$size: "$favorited"}, favorited: req.user.username})
} 
module.exports = { createArticle, getAllArticle, findArticlesQuery, findOneArticle,findOneAndUpdateArticle, findAllTags, favoriteArticle,unFavoriteArticle }