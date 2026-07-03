const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send('Please login to access this resource');
    }
    

    const decodedObj = jwt.verify(token, 'piysat@project001');

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error('User not found');
    } 
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  userAuth,
};

























// const adminAuth = (req, res, next) => {
//     console.log("Admin auth middleware called");
//   const token = "xyz";
//   const isAdmin = token === "xyz"; // Replace with your actual admin token validation logic
//   if (!isAdmin) {
//     return res.status(403).send('Access denied');
//   } else {
//     console.log("Admin auth successful");
//     next();
//   }
// }

// const userAuth = (req, res, next) => {
//     console.log("User auth middleware called");
//   const token = "abc";
//   const isUser = token === "abc";
//   if (!isUser) {
//     console.log("User auth failed");
//     return res.status(403).send('Access denied');
//   } else {
//     console.log("User auth successful");
//     next();
//   }  
// }

// module.exports = {
//     adminAuth,
//     userAuth
// };