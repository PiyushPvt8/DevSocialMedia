const express = require('express');
const connectDB = require('./config/database');
const app = express();
const port = process.env.PORT || 1998;
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
  }
  ));

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/authRouter');
const profileRouter = require('./routes/profileRouter');
const requestRouter = require('./routes/requestRouter');
const userRouter = require('./routes/userRouter');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);


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


// This route is for testing purposes to find users by email. In a real application, you would typically have a more secure and comprehensive user management system.
// app.get('/users', async (req, res) => {
//   try {
//     const usersEmail = req.body.email;
//     const users = await User.find({ email: usersEmail });

//     if (users.length === 0) {
//       return res.status(404).send('No users found with the provided email');
//     } else {
//       res.status(200).json(users);
//       console.log(users);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   } 
// });



//app.post('/signup', async (req, res) => { 
//   const userObject = {
//     firstName: "Bhuttu",
//     lastName: "Chawanni",
//     email: "chawanni45@example.com",
//     password: "345640896",
//     age: 8,
//     gender: "Male"
//   };

//   const user = new User(userObject);
//   try {
//     await user.save();
//     res.status(201).send('User created successfully');
//   }catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });

