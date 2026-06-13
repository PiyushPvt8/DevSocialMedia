const express = require('express');
const app = express();
const port = 1998;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/users', [(req, res, next) => {
  console.log("FIRST RESPONSE FROM SERVER");
  res.send('Hello World!');
  next();

}, (req, res, next) => {
  console.log("SECOND RESPONSE FROM SERVER");
  res.send('2ND Hello World!');
  next();
}
, (req, res, next ) => {
  console.log("THIRD RESPONSE FROM SERVER");
  res.send('3RD Hello World!');
  next();
}], (req, res, next) => {
  console.log("FOURTH RESPONSE FROM SERVER");
  res.send('4TH Hello World!');
}
);
