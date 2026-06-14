const express = require('express');
const app = express();
const port = 1998;

const { adminAuth, userAuth } = require('./middlewares/auth');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/getUserData", (req, res, next) => {
  try { 
    throw new Error("User data access error");
      res.send("User data accessed successfully");
  } catch (error) {
    console.log(error);
  }
  next();
});

app.use("/getAdminData", (err, req, res, next) => {
  throw new Error("Admin data access error");
  if (err) {
    console.log("Error in /getAdminData route:", err.message);
    return res.status(500).send("Internal Server Error");
  } 
});
