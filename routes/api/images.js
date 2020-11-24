const express = require('express');
const config = require('config');
const router = express.Router();

global.fetch = require('node-fetch');

const giphy = require('@giphy/js-fetch-api');
const gf = new giphy.GiphyFetch(config.get('giphyKey'));

router.post('/get-trending', async (req, res) => {
  let offset = req.body.offset;
  try {
    const fetchGifs = await gf.trending({ offset, limit: 10 });
    res.send(fetchGifs);
  } catch (err) {
    console.error(err);
  }
});

router.post('/search-images', async (req, res) => {
  try {
    const fetchGifs = await gf.search(req.body.query, { limit: 15 });
    res.send(fetchGifs);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
