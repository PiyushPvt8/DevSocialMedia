const express = require('express');
const app = express();
const port = 1998;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api", (req, res) => {
  res.send(`This is a test API endpoint! port: ${port}`);
});

app.use("/test/data", (req, res) => {
  const data = {
    message: 'This is some sample data from the API.',
    timestamp: new Date()
  };
  res.json(data);
});

app.use("/id/user/:id", (req, res) => {
  const userId = req.params.id;
  const userData = {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`
  };
  res.json(userData);
});

app.use("/", (req, res) => {
  res.send(`Hello from the server! This is the root endpoint. port: ${port}`);
});