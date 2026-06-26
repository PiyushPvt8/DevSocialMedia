const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');

profileRouter.get('/profile', userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json("User name: " + user.firstName + " " + user.lastName);

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


module.exports = profileRouter;