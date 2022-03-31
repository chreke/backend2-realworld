const express = require('express');
const router = express.Router();


const {createArticle, renderArticles} = require("../controllers/articleController")

router.get('/api/articles', renderArticles)
router.post('/api/articles', createArticle);

module.exports = router;
