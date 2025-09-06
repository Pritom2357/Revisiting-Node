const express = require('express');
const {generateNewShortURL, redirect, analytics} = require('../controllers/url.js');
const router = express.Router();

router.post('/', generateNewShortURL);
router.get('/:shortId', redirect);
router.get('/analytics/:shortId', analytics)

module.exports = router;