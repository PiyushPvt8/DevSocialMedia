const express = require('express');
const app = express();
const port = 1998;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/user', (req, res) => {
  res.send('Hello, User!');
});

app.post('/user', (req, res) => {
  res.send('User created!');
});

app.put('/user', (req, res) => {
  res.send('User updated!');
});

app.delete('/user', (req, res) => { res.send('User deleted!');
});

app.patch('/user', (req, res) => {
  res.send('User patched!');
});