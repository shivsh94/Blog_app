import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedpassword });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(201).json({success: true, message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("-hashedPassword");
    if (!user) {
      return res.status(400).json({ message: "User not exist" });
    }

    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({success: true, message: "User logged in successfully", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Something went wrong in login" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({success:true, message: "User logged out successfully" });
  }  catch (error) {
    res.status(500).json({success:false, message: "Something went wrong in logout" });
  }
};

export const isVerify= async (req, res) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(data.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.json({success:true, message: "User authenticated", user });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const updateSocialLinks = async (req, res) => {
  try {
    const userId = req.userID;
    const { twitter, linkedin, instagram } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.social = {
      ...user.social,
      ...(twitter && { twitter }),
      ...(linkedin && { linkedin }),
      ...(instagram && { instagram }),
    };

    await user.save(); // Save changes

    res.status(200).json({
      success: true,
      message: "Social media links updated successfully",
      social: user.social,
    });

  } catch (error) {
    console.error("Update Social Media Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};