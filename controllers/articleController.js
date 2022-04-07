const asyncHandler = require('express-async-handler');
const { Article } = require('../models/Article');

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

const renderArticles = async (req, res) => {
  try {
    const articlesCount = await Article.find().count();
    const articles = await Article.find().sort('-createdAt').exec();
    res.json({ articles, articlesCount });
  } catch (err) {
    res.json({ message: err });
  }
};

const getSingleArticleBySlug = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const article = await Article.findOne({ slug }).populate('author').exec();
  res.json({ article });
});

const updateArticle = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const article = await Article.findOne({ slug });
  console.log(req.body);
  article.title = req.body.article.title;
  article.description = req.body.article.description;
  article.body = req.body.article.body;
  article.tagList = req.body.article.tagList;
  await article.save();
  console.log(article);

  res.json({ article });
});
module.exports = {
  createArticle,
  renderArticles,
  getSingleArticleBySlug,
  updateArticle,
};
