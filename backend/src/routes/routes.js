import express from "express";
import Comment_model from "../model/comments.js";
import Post_model from "../model/posts.js"
import User_model from "../model/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// import auth from "../middleware/auth.js";

const router = express.Router();



// auth create  user


router.post("/users/createUser", async (req, res) => {
  const { name, email, mobile, password, confirmPassword, role } = req.body;
 if (password !== confirmPassword) {
    return res.status(400).json({ message: "password not match" });
  }
  if(password.length < 8){
    return res.status(400).json({ message: "password must be 8 character" });
  }
  if (role !== "admin" && role !== "user") {
    return res.status(400).json({ message: "role must be admin or user" });
  }
  if (mobile.length !== 11) {
    return res.status(400).json({ message: "mobile number must be 10 digit" });
  }
  if(email.indexOf("@") === -1){
    return res.status(400).json({ message: "email must be valid" });
    }
    if(email.indexOf(".") === -1){
    return res.status(400).json({ message: "email must be valid" });
    }
  try {
    bcrypt.hash(password, 10).then( async (hash) => {
      await User_model.create({ name, email, mobile, password: hash, confirmPassword: hash, role })
      .then(
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



export default router;
