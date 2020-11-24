const express = require('express');
const config = require('config');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');

router.put('/save-gif', auth, async (req, res) => {
  try {
    let gif = req.body.gif;
    let user = await User.findByIdAndUpdate(req.user.id);

    await user.favourites.push(gif);
    await user.save();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
