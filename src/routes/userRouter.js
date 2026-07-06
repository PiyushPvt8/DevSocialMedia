const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "photoURL",
  "about",
  "skills",
];

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    if (connectionRequests.length === 0) {
      return res.status(404).json({
        message: "No connection requests found",
      });
    }

    const data = connectionRequests.map((row) => {
      row.fromUserId.password;
    });

    res.json(connectionRequests);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("toUserId", USER_SAFE_DATA)
      .populate("fromUserId", USER_SAFE_DATA);

    if (connectionRequests.length === 0) {
      return res.status(404).json({
        message: "No connections found",
      });
    }
    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    limit = limit > 15 ? 15 : limit;

    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    connectionRequests.forEach((request)=> {
        hideUsersFromFeed.add(request.fromUserId.toString());
        hideUsersFromFeed.add(request.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);

    res.json({data: users});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
