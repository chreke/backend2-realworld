const express = require('express');
const router = express.Router();

const {
  createArticle,
  renderArticles,
  getSingleArticleBySlug,
} = require('../controllers/articleController');

router.get('/api/articles', renderArticles);
router.post('/api/articles', createArticle);
router.get('/api/articles/:slug', getSingleArticleBySlug);

module.exports = router;
