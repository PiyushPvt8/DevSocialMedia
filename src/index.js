const express = require('express');
const connectDB = require('./config/database');
const app = express();
const port = 1998;
const User = require('./models/user'); 

app.post('/signup', async (req, res) => {
  const userObject = {
    firstName: "Gappu",
    lastName: "Gappandi",
    email: "gau98@example.com",
    password: "34562324",
    age: 7,
    gender: "Male"
  };

  const user = new User(userObject);
  try {
    await user.save();
    res.status(201).send('User created successfully');
  }catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

connectDB().
then(() => {
  console.log('Connected to MongoDB');

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});