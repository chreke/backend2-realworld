
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

    if(author){
        try {
            const user = await User.findOne({username: author})
            const articlesCount = await Article.find({author: user._id}).count()
            const articles = await Article.find({author: user._id})
            res.json({articles, articlesCount})
        } catch (err) {
            res.json({message: err})
        }
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


const updateArticle = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const article = await Article.findOne({ slug });
  console.log(req.body);
  article.title = req.body.article.title;
  article.description = req.body.article.description;
  article.body = req.body.article.body;
  article.tagList = req.body.article.tagList;
  await article.save();
  

  res.json({ article });
});
module.exports = {
  createArticle,
  renderArticles,
  getSingleArticleBySlug,
  updateArticle,
};
