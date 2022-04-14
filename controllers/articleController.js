
const asyncHandler = require('express-async-handler');
const { Article } = require('../models/Article');


const { User } = require("../models/User")



const createArticle = async (req, res) => {
  const { title, description, body, tagList } = req.body.article;

  const entry = new Article({
    title,
    description,
    body,
    tagList,
    author: req.user.userId,
  });
  await entry.save();


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
      favoritesCount: entry.favoritesCount,
    },
  });
};

const getSingleArticleBySlug = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const article = await Article.findOne({ slug }).populate('author').exec();
  res.json({ article });
});

const renderArticles = async (req, res) => {
    const author = req.query.author
    const tag = req.query.tag
    const favorited = req.query.favorited

   

    if(author){
        try {
            const user = await User.findOne({username: author})
            const articlesCount = await Article.find({author: user._id}).count()
            const articles = await Article.find({author: user._id})
            res.json({articles, articlesCount})
              } catch (err) {
            res.json({message: err})
            }
      } else if (tag){
          const articles = await Article.find({tagList: tag})
          const articlesCount = await Article.find({tagList: tag}).count()
          

          console.log(articles)
          res.json({articles, articlesCount})
        } else if (favorited){
          const user = await User.findOne({username: favorited})
          const articles = await Article.find({favoritedBy: user._id})
          const articlesCount = await Article.find({favoritedBy: user._id}).count()
          console.log(articles)
          res.json({articles, articlesCount})
            
        
        } else {
          try {
            const articlesCount = await Article.find().count()
            const articles = await Article.find().sort('-createdAt').exec()
            res.json( { articles, articlesCount })
           
        } catch (err) {
            res.json({message: err})
        }
    }

}


const deleteArticle = async(req, res) => {
  const slug = req.params.slug
 
  await Article.deleteOne({ slug })
  
  
  
}

const updateArticle = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const article = await Article.findOne({ slug });
  
  article.title = req.body.article.title;
  article.description = req.body.article.description;
  article.body = req.body.article.body;
  article.tagList = req.body.article.tagList;
  await article.save();
  

  res.json({ article });
});

const setFavorited = asyncHandler(async (req, res) => {
  const slug = req.params.slug

  await Article.updateOne(
    { slug: slug },
    {
      $push: { favoritedBy: req.user.userId },
      $inc: { favoritesCount: 1 },
      favorited: true
    })
  let article = await Article
    .find({ slug: slug })
    .populate("author")
    .exec()

  article = article[0]
  res.json({ article });
});

const removeFavorited = asyncHandler(async (req, res) => {
  console.log("DELETE")
  let slug = req.params.slug;
  await Article.updateOne(
      { slug: slug },
      {
          $pull: { favoritedBy: req.user.userId },
          $inc: { favoritesCount: -1 },
          favorited: false
      })
  let article = await Article
      .find({ slug: slug })
      .populate("author")
      .exec()

  article = article[0]
  res.json({ article });
});

module.exports = {
  createArticle,
  renderArticles,
  getSingleArticleBySlug,
  updateArticle,
  deleteArticle,
  setFavorited,
  removeFavorited
};
