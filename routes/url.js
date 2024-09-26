const express = require('express');
const {handdleGenerateNewShortUrl}= require('../controllers/url')
const router = express.Router();

router.post('/', handdleGenerateNewShortUrl);
module.exports = router;