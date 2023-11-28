const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
//const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const passport = require("passport");

require("dotenv").config();

require("../db/conn");
const User = require("../model/userSchema");
const Token = require("../model/tokenSchema");
const Instructor = require("../model/insSchema");

// user part////////////////////////////////////////////

router.put('/update-info', async (req, res) => {
  const { email, name, phone, password, newPassword } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }


    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (newPassword) {
      user.password = newPassword;
      user.cpassword = newPassword;
    }



    await user.save();

    res.json({ message: 'User information updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    const tokenValue = crypto.randomBytes(20).toString('hex');


    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    const token = new Token({
      email: user.email,
      token: tokenValue,
      expiresAt: expirationTime,
    });
    const saveToken = await token.save();


    res.status(200).json({ email: user.email, message: 'Token generated successfully', token: tokenValue });
  } catch (error) {
    console.error('Error during forgot password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;


    const resetToken = await Token.findOne({ email, token, expiresAt: { $gt: new Date() } });

    if (!resetToken) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }


    const user = await User.findOneAndUpdate({ email }, { password: newPassword, cpassword: newPassword });


    await resetToken.remove();

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get(
  "/bot",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    return res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.name,
      },
    });
  }
);
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken"); // Clear the JWT token cookie
  return res.status(200).send({
    success: true,
    message: "User has been logged out successfully",
  });
});

router.post("/signup", async (req, res) => {
  const { email, name, phone, password, cpassword } = req.body;

  if (!email || !name || !phone || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly!" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Account already exists!" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password does not match!" });
    } else {
      const user = new User({
        email,
        name,
        userType: 'Student',
        phone,
        password,
        cpassword,
      });
      const userRegister = await user.save();

      if (userRegister) {
        res.send({
          success: true,
          message: "User is created Successfully",
          user: {
            id: user._id,
            username: user.name,
          },
        });
      } else {
        res.status(500).json({ error: "Registration failed!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill the field properly!" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User is not found",
        error: "kisu ekta",
      });
    }
    if (password !== user.password) {
      return res.status(401).send({
        success: false,
        message: "User login not successful",
        error: "Invalid password",
      });
    }

    const payload = {
      id: user._id,
      username: user.name,
      userType: user.userType
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2d" });

    res.cookie("jw_token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).send({
      success: true,
      message: "User is logged in successfully",
      Hello: user,
      token: "Bearer " + token,
      user: payload
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


//for about me //
router.get("/user/:id", async (req, res) => {
  const user_Id = req.params.id;

  try {
    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch all users
router.get("/userall", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// delete user------
router.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// instructor

router.post("/ins-signup", async (req, res) => {
  const { email, name, phone, password, cpassword } = req.body;

  if (!email || !name || !phone || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly!" });
  }

  try {
    const userExist = await Instructor.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Account already exists!" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password does not match!" });
    } else {
      const user = new Instructor({
        email,
        name,
        userType: 'INS',
        phone,
        password,
        cpassword,
      });
      const userRegister = await user.save();

      if (userRegister) {
        res.send({
          success: true,
          message: "User is created Successfully",
          user: {
            id: user._id,
            username: user.name,
            userType: user.userType
          },
        });
      } else {
        res.status(500).json({ error: "Registration failed!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.post("/ins-signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill the field properly!" });
  }
  const user = await Instructor.findOne({ email: email });
  if (!user) {
    return res.status(401).send({
      success: false,
      message: "User is not found",
      error: "kisu ekta",
    });
  }
  if (password !== user.password) {
    return res.status(401).send({
      success: false,
      message: "User login not successful",
      error: "Invalid password",
    });
  }

  const payload = {
    id: user._id,
    username: user.name,
    userType: user.userType
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
  res.cookie("jw_token", token, {
    httpOnly: true, // This makes the cookie inaccessible from JavaScript
    // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    maxAge: 2 * 24 * 60 * 60 * 1000, // Cookie expiration time (2 days)
  });
  return res.status(200).send({
    success: true,
    message: "User is logged in successfully",
    Hello: user,
    token: "Bearer " + token,
  });
});
module.exports = router;
