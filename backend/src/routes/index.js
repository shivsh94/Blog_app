import express from "express";
import { register, login, logout, isVerify } from "../controller/userController.js";
import { createBlog, deleteBlog, updateBlog, getUserBlogs } from "../controller/blogController.js";
import { isAuthenticate } from "../middleware/authentication.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
});

router.get("/isverify", isVerify);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/create", isAuthenticate, createBlog);
router.delete("/delete/:id", isAuthenticate, deleteBlog);
router.put("/update/:id", isAuthenticate, updateBlog);
router.get("/getblogs",isAuthenticate, getUserBlogs); 

export default router;
