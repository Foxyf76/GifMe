const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');

/**
 * @route    PUT api/users/search-gif
 * @desc     Add Gif to favourites
 * @access   Private
 */

router.put('/save-gif', auth, async (req, res) => {
  try {
    let gif = req.body.gif;
    let user = await User.findByIdAndUpdate(req.user.id);
    await user.favourites.push(gif);
    await user.save();
    res.status(200).send('success');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
