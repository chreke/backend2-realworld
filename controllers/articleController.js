const { Article } = require("../models/Article")


const createArticle = async (req, res) => {
    const { title, description, body, tagList } = req.body.article;
    

    const entry = new Article({title, description, body, tagList } )
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



const renderArticles = async (req, res) => {

    try {
        const articlesCount = await Article.find().count()
        const articles = await Article.find().exec()
        res.json( { articles, articlesCount })
       
        
    } catch (err) {
        res.json({message: err})
    }
    
}


module.exports =  { createArticle, renderArticles }