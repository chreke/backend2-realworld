const express = require('express');
const router = express.Router();

const { getTags } = require('../controllers/tagsController');

router.get('/api/tags', getTags);

module.exports = router;