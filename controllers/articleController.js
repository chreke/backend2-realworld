const { Article } = require("../models/Article")
const { User } =require("../models/User")



const createArticle = async (req, res) => {
    const { title, description, body, tagList } = req.body.article;
    

    const entry = new Article({title, description, body, tagList, author: req.user.userId } )
    await entry.save()

    res.json({
        article: {
            title: entry.title,
            description: entry.description,
            body: entry.body,
            tagList: entry.tagList,
            createdAt: entry.createdAt,
            slug: entry.slug,
            updatedAt: entry.updatedAt,
            author: entry.author,
            favorited: entry.favorited,
            favoritesCount: entry.favoritesCount
        
        }
    })

}

const renderArticlesAuthor = async (req,res) => {
    try {
        const author = req.query.author
    const user = await User.findOne({usename: author})
    const articlesCount = await Article.find({author: user._id}).count()
    const articles = await Article.find({author: user._id})
    res.json({articles, articlesCount})
    } catch (err) {
        res.json({message: err})
    }
    
}



const renderArticles = async (req, res) => {

    try {
        const articlesCount = await Article.find().count()
        const articles = await Article.find().sort('-createdAt').exec()
        res.json( { articles, articlesCount })
       
        
    } catch (err) {
        res.json({message: err})
    }
    
}


module.exports =  { createArticle, renderArticles, renderArticlesAuthor }