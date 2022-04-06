const req = require("express/lib/request")
const res = require("express/lib/response")
const mongoose = require("mongoose")
const articleSchema = mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    body: {type: String, required: true},
    description: {type: String, required: true},
    favorited: {type: Boolean, default: false},
    favoritedBy: [],
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
const findArticlesQuery = async(query, username) => {
    if(query.tag !== undefined){
        return await Article.find({tagList: query.tag})
    } else if(query.author !== undefined){
        return await Article.find(query)
    }else if (query.favorited !== undefined){
        const article = await Article.find({favoritedBy: username}).select({favoritedBy: false})
        article.forEach(item => item.favorited = true)
        return article
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
const favoriteArticle = async(slug, user) => {
    const article = await Article.findOne(slug)
    if(article.favoritedBy.includes(user.username) === true){
        return "you have already liked"
    }else {
        const articles = await Article.findOneAndUpdate(slug, {$addToSet: {favoritedBy: user.username}, $inc: {favoritesCount: +1}}, {new: true}).select({favoritedBy: false})
        articles.favorited = true
        return articles
    }
}
const unFavoriteArticle = async(slug, user) => {
    const article = await Article.findOne(slug)
    if(article.favoritedBy.includes(user.username) === false){
        return "you have already unliked"
    }else {
        return await Article.findOneAndUpdate(slug, {$pull: {favoritedBy: user.username}, $inc: {favoritesCount: -1}}, {new: true}).select({favoritedBy: false})
    } 
} 
const deleteArticle = async(slug, username) => {
    return await Article.findOneAndDelete({slug: slug, username: username})
}
module.exports = {deleteArticle, createArticle, getAllArticle, findArticlesQuery, findOneArticle,findOneAndUpdateArticle, findAllTags, favoriteArticle,unFavoriteArticle }