const adminAuth = (req, res, next) => {
    console.log("Admin auth middleware called");
  const token = "xyz";
  const isAdmin = token === "xyz"; // Replace with your actual admin token validation logic
  if (!isAdmin) {
    return res.status(403).send('Access denied');
  } else {
    console.log("Admin auth successful");
    next();
  }
}

const userAuth = (req, res, next) => {
    console.log("User auth middleware called");
  const token = "abc";
  const isUser = token === "abc";
  if (!isUser) {
    console.log("User auth failed");
    return res.status(403).send('Access denied');
  } else {
    console.log("User auth successful");
    next();
  }  
}

module.exports = {
    adminAuth,
    userAuth
};