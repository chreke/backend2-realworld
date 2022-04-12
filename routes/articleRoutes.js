const express = require('express');
const router = express.Router();

const {
  createArticle,
  renderArticles,
  getSingleArticleBySlug,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');

router.get('/api/articles', renderArticles)
router.get('/api/articles/feed', renderArticles)
router.delete('/api/articles/:slug', deleteArticle)
router.post('/api/articles', createArticle);
router.get('/api/articles/:slug', getSingleArticleBySlug);
router.put('/api/articles/:slug', updateArticle);


module.exports = router;
