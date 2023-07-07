import express from "express";
import User_model from "../model/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Tweet_model from "../model/tweets.js";

// import auth from "../middleware/auth.js";

const router = express.Router();

// auth create  user

router.post("/createUser", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "password is less than 8 characters" });
  }
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  if (email.indexOf("@") === -1) {
    return res.status(400).json({ message: "invalid email" });
  }
  if (email.indexOf(".") === -1) {
    return res.status(400).json({ message: "invalid email" });
  }
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      await  User_model.create({ firstName, lastName, email, password: hash }).then(
        (user) => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, email },
            process.env.JWT_SECRECT_KEY,
            { expiresIn: maxAge }
          );
          res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(201).json({ message: "User successfully created", user });
        }
      );
    });
  } catch (err) {
    res.status(400).json({
      message: "User not successfully created",
      error: err.message,
    });
  }
});

// auth login user

router.post("/users/loginUser", async (req, res, next) => {
  const { email, password } = req.body;
  // check if email and password is provided
  if (!email || !password) {
    return res.status(400).json({ message: "email or password not provided " });
  }
  try {
    const user = await User_model.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ message: "Login not successful", error: "User not found" });
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, email },
            process.env.JWT_SECRECT_KEY,
            { expiresIn: maxAge }
          );

          // user.token = token;

          res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(201).json({ message: "Login successful", user, token });
        } else {
          res.status(400).json({ message: "Invalid Credentials" });
        }
      });
    }
  } catch (err) {
    res.status(400).json({ message: "An error occurred", error: err.message });
  }
});

// auth logout user

router.get("/users/logoutUser", async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "Logout successful" });
});

// auth create tweet

router.post("/createTweet", async (req, res) => {
  const { tweet } = req.body;
  try {
    await Tweet_model.create({ tweet }).then((tweet) => {
      res.status(201).json({ message: "Tweet successfully created", tweet });
    });
  } catch (err) {
    res.status(400).json({
      message: "Tweet not successfully created",
      error: err.message,
    });
  }
});

// auth get all tweet

router.get("/getAllTweet", async (req, res) => {
  try {
    await Tweet_model.find().then((tweet) => {
      res.status(201).json({ message: "Tweet successfully listed", tweet });
    });
  } catch (err) {
    res.status(400).json({
      message: "Tweet not successfully created",
      error: err.message,
    });
  }
});

// auth get tweet by id

router.get("/getTweetById/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Tweet_model.findById(id).then((tweet) => {
      res.status(201).json({ message: "Tweet successfully displayed", tweet });
    });
  } catch (err) {
    res.status(400).json({
      message: "Tweet not successfully created",
      error: err.message,
    });
  }
});

// auth update tweet by id

router.put("/updateTweetById/:id", async (req, res) => {
  const { id } = req.params;
  const {tweet} = req.body;

  try {
    await Tweet_model.findByIdAndUpdate(id, {tweet});
      res.status(201).json({ message: "Tweet successfully updated" });
  } catch (err) {
    res.status(400).json({
      message: "Tweet not successfully updated",
      error: err.message,
    });
  }
});

// auth delete tweet by id

router.delete("/deleteTweetById/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Tweet_model.findByIdAndDelete(id);
      res.status(201).json({ message: "Tweet successfully deleted" });
  } catch (err) {
    res.status(400).json({
      message: "Tweet not successfully deleted",
      error: err.message,
    });
  }
});

export default router;
