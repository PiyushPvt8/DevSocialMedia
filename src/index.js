const express = require('express');
const connectDB = require('./config/database');
const app = express();
const port = 1998;
const User = require('./models/user'); 
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');

app.use(express.json());

app.post('/signup', async (req, res) => {

  
  try {
     validateSignUpData(req);
     const { firstName, lastName, email, password, age, gender, photoURL, about, skills } = req.body;

      // Hash the password before saving it to the database

      const hashedPassword = await bcrypt.hash(password, 10);

     const user = new User({
       firstName,
       lastName,
       email,
       password: hashedPassword,
       age,
       gender,
       photoURL,
       about,
       skills
     });
     await user.save();
     res.status(201).send('User created successfully');
    }
    catch (error) 
    {
      res.status(500).send("Error: " + error.message);
    }
});


app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.delete('/users', async (req, res) => {
  try {
    const usersId = req.body._id;

    const deletedUser = await User.findByIdAndDelete({ _id: usersId });

    if (!deletedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


app.patch('/users/:_id', async (req, res) => {
  try {
    const usersId = req.params?._id; // Assuming the user ID is passed as a query parameter in the request URL
    const Data = req.body;

    const ALLOWED_UPDATES = ['firstName', 'lastName', 'password', 'skills', 'about', 'photoURL', 'age'];

    const isAllowedUpdate = Object.keys(Data).every((key) => ALLOWED_UPDATES.includes(key));

    if (!isAllowedUpdate) {
      return res.status(400).send('Invalid updates. Only firstName, lastName, and password can be updated.');
    }

    if (Data.skills?.length > 10) {
      return res.status(400).send('Invalid updates. You can only specify up to 10 skills.');
    }

    const updatedUser = await User.findByIdAndUpdate({ _id: usersId }, Data, {
      returnDocument: 'after', // Return the updated document instead of the original one, for better error handling and validation.
      runValidators: true
    });

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('User updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
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