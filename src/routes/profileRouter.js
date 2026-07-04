const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const {validateEditData} = require('../utils/validation');
const {bcrypt} = require('bcrypt');

profileRouter.get('/profile/view', userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json(user);

  } catch (error) {
    console.error("Profile View Error:", error);
    res.status(500).send(error.message);
  }
});

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
  try {

    if (!validateEditData(req)) {
      throw new Error('Invalid edit data');
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Forgot Password

profileRouter.patch('/profile/forgotPassword', userAuth, async (req, res) => {
  try {
    const { password } = req.body;
    const user = req.user;
    //Bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    
    await user.save();

    res.status(200).json({
    message: "Password updated successfully"
});
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


module.exports = profileRouter;