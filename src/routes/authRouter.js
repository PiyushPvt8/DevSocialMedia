const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { validateSignUpData } = require('../utils/validation');  


authRouter.post('/signup', async (req, res) => { 
  try {
     validateSignUpData(req);
     const { firstName, lastName, email, password, age, gender, photoURL, about, skills } = req.body;

      // Hash the password before saving it to the database

      const hashedPassword = await bcrypt.hash(password, 10);

     const user = new User({
       firstName,
       lastName,
       email,
       password: hashedPassword,
       age,
       gender,
       photoURL,
       about,
       skills
     });
     await user.save();
     res.status(201).send('User created successfully');
    }
    catch (error) 
    {
      res.status(500).send("Error: " + error.message);
    }
});


authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie('token', token, {expires: new Date(Date.now() + 168 * 3600000)}); //7 days
      res.status(200).send('Login successful');
    }
    else {
      throw new Error("Invalid credentials");
    }

  } catch (error) {
    console.error(error);
    res.status(500).send("Error: " + error.message);
  }
});


module.exports = authRouter;