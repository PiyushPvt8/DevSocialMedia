const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("Please login to access this resource");
    }

    const decodedObj = jwt.verify(token, process.env.JWT_TOKEN_KEY);

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).send("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("AUTH ERROR:", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).send(error.message);
    }
    return res.status(500).send("Internal server error");
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
// }
