const express = require('express');
const app = express();
const port = 1998;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/user/:userId/:username', (req, res) => {
  const { userId, username } = req.params;
  res.send(`Hello, ${username}! Your ID is ${userId}.`);
});

app.get(/\/search\/ab?c\/ab.*if\/.*fly$/, (req, res) => {
  res.send('You have reached the search endpoint with a complex pattern!');
}); 