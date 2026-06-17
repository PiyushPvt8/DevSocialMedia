const express = require('express');
const connectDB = require('./config/database');
const app = express();
const port = 1998;
const User = require('./models/user'); 

app.use(express.json());

app.post('/signup', async (req, res) => {
  console.log(req.body);

  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send('User created successfully');
  }catch (error) {
    console.error(error);
    res.status(500).send(error.message);
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


app.patch('/users', async (req, res) => {
  try {
    const usersId = req.body._id;
    const Data = req.body;

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