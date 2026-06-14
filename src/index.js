const express = require('express');
const app = express();
const port = 1998;

const { adminAuth, userAuth } = require('./middlewares/auth');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/admin', adminAuth);

app.get('/admin/dashboard', adminAuth, (req, res) => {
  res.send('Admin dashboard');
});

app.get('/user/login',(req, res) => {
  console.log("User login route called");
  res.send('User login');
});

app.get('/user', userAuth);

app.get('/user/dashboard', userAuth, (req, res) => {
  res.send('User dashboard');
});

