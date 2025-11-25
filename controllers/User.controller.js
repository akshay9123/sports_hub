import mongoose from "mongoose";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const registerUserRequest = async (req, res) => {
  const { username, name, email, password, role } = req.body;

  try {
    if (!username || !name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Check if username already exists
    const existusername = await User.findOne({ username });

    if (existusername) {
      return res.status(400).json({
        success: false,
        message: "UserName already Exist",
      });
    }

    // Create new user
    const newUser = await User.create({
      username,
      email,
      name,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const loginUserRequest = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Validation
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check user exist
    const isExist = await User.findOne({ email });

    if (!isExist) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Password check
    if (isExist.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }


    // check role
    if (isExist.role != role) {
      return res.status(400).json({
        success: false,
        message: "Your are not authorized",
      });
    }

    // 🔥 Generate JWT Token
    const token = jwt.sign(
      { id: isExist._id, email: isExist.email, role: isExist.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 Set Token in HttpOnly Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // VPS/Production → true
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      token, // Optional: if you want to send in response too
      user: {
        name: isExist.name,
        email: isExist.email,
        role: isExist.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};



export const logoutUserRequest = async (req, res) => {
  try {
    // Clear the token cookie
    res.cookie("token", "", {
      httpOnly: true,
      secure: false, // production me true rakhna
      sameSite: "lax",
      expires: new Date(0), // Expire immediately
    });

    return res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
