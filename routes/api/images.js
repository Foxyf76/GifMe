const express = require('express');
const config = require('config');
const router = express.Router();
require('dotenv').config();

global.fetch = require('node-fetch');

const giphy = require('@giphy/js-fetch-api');
const gf = new giphy.GiphyFetch(process.env.giphyKey);
//const gf = new giphy.GiphyFetch(config.get('giphyKey'));

/**
 * @route    POST api/images/get-trending
 * @desc     Retrieve Giphy trending images
 * @access   Public
 */

router.post('/get-trending', async (req, res) => {
  let offset = req.body.offset;
  try {
    const fetchGifs = await gf.trending({ offset, limit: 10 });
    res.send(fetchGifs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * @route    POST api/images/search-images
 * @desc     Search from Giphy images
 * @access   Public
 */

router.post('/search-images', async (req, res) => {
  try {
    const fetchGifs = await gf.search(req.body.query, { limit: 15 });
    res.send(fetchGifs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
