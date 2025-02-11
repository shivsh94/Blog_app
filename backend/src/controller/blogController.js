import Blog from "../models/blog.js";
import User from "../models/user.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

    if (!title || !content) {
        return res.status(404).json({ message: "All fields are required" });
    }

    const author = await User.findById(req.userID);


    const newBlog = await Blog.create({
        title,
        content,
        author_id: author._id,
        author_name: author.name,
    });
    res
        .status(201)
        .json({success:true, message: "Blog created successfully", blog: newBlog });
    } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message: "Something went wrong in creating blog" });
    }
};

export const deleteBlog = async (req, res) => {
    try {
    const blogID = req.params.id;

    const blog = await Blog.findById(blogID);
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    if(blog.author_id.toString() !== req.userID){
        return res.status(403).json({ message: "You are not the author of this blog"});
    }
    
    await Blog.findByIdAndDelete(blogID);
    res.status(200).json({success:true, message: "Blog deleted successfully" });
    } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message: "Something went wrong in deleting blog" });
    }
};

export const updateBlog = async (req, res) => {
    try {
        
        const blogID = req.params.id;

        const blog = await Blog.findById(blogID);

        if(!blog){
            return res.status(404).json({ message: "Blog not found" });
        }

        if(blog.author_id.toString() !== req.userID){
            return res.status(403).json({ message: "You are not the author of this blog"});
        }

        await Blog.findByIdAndUpdate(blogID, {
            $set: {
                title: req.body.title,
                content: req.body.content
            }

        }, { new: true });

        res.status(200).json({ success: true, message: "Blog updated successfully" });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong in updating blog" });
        
    }
}

export const getUserBlogs = async (req, res) => {
    try {
        const userID = req.userID;
        // console.log(userID);
        

        const blogs = await Blog.find({ author_id: userID });
        // console.log(blogs);
        

        if (blogs.length === 0) {
            return res.status(200).json({ success: true, blogs: [] });
        }

        res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong in fetching user blogs" });
    }
};

