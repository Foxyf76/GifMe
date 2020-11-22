const express = require('express');
const config = require('config');
const router = express.Router();
const axios = require('axios');

router.get('/search-images', async (req, res) => {
  try {
    const fetchGifs = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${config.get(
        'giphyKey'
      )}&q=${req.body.query}`
    );

    res.send(fetchGifs.data);
  } catch (err) {
    console.error(err);
  }
});

router.post('/get-trending', async (req, res) => {
  console.log(req.body);
  try {
    const fetchGifs = await axios.get(
      `https://api.giphy.com/v1/gifs/trending?api_key=${config.get(
        'giphyKey'
      )}&offset=${req.body.offset}`
    );

    res.send(fetchGifs.data);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
