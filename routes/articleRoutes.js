const express = require('express');
const router = express.Router();


const {createArticle, renderArticles, renderArticlesAuthor} = require("../controllers/articleController");
const { Article } = require('../models/Article');
const { User } = require('../models/User');

router.get('/api/articles', renderArticlesAuthor)
router.get('/api/articles', renderArticles)
router.get('/api/articles/feed', renderArticles)
router.post('/api/articles', createArticle);

module.exports = router;
