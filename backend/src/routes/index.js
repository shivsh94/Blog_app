import express from "express";
import { register, login, logout, isVerify,updateSocialLinks } from "../controller/userController.js";
import { createBlog, deleteBlog, updateBlog, getUserBlogs, getAllBlogs, commentOnBlog,getComments } from "../controller/blogController.js";
import { isAuthenticate } from "../middleware/authentication.js";

const router = express.Router();

    router.get("/", (req, res) => {
        res.send("hello");
    });

router.get("/isverify", isVerify);
router.post("/register", register);
router.post("/login", login);
router.get("/getallblogs", getAllBlogs);
router.get("/logout", logout);
router.post("/create", isAuthenticate, createBlog);
router.delete("/delete/:id", isAuthenticate, deleteBlog);
router.put("/update/:id", isAuthenticate, updateBlog);
router.get("/getblogs",isAuthenticate, getUserBlogs); 
router.post("/comment/:id", isAuthenticate, commentOnBlog);
router.get("/getcomments/:id", getComments);
router.put("/social", isAuthenticate, updateSocialLinks);


export default router;
