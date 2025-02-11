import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import BlogCard from "./BlogCard";

function Home() {
    const [blogs, setBlogs] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const fetchBlogs = async () => {
        try {
            const response = await axios.get("/getallblogs");
            // console.log(response.data);


            if (response.data.success) {
                setBlogs(response.data.blogs);

            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };
    useEffect(() => {
        fetchBlogs();
        // console.log("Blogs:", blogs);
    }, []);

    const handleMyBlogs = async () => {
        try {
            const response = await axios.get("/getblogs");
            // console.log(response.data);


            if (response.data.success) {
                setBlogs(response.data.blogs);

            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };


    return (
        <div>

            <div className="h-25 w-full mt-10 text-3xl font-serif flex flex-col gap-5 justify-center items-center">
                <p>Write Your Thoughts Here!!</p>
                <div className="flex gap-5">
                    <button onClick={() => setIsEditOpen(true)} className="px-6 py-2 text-2xl bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                        Create Blog
                    </button>

                    <button onClick={handleMyBlogs} className="px-6 py-2 text-2xl bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition">
                        My Blogs
                    </button>
                </div>
            </div>

            {isEditOpen && <CreateBlog setIsEditOpen={setIsEditOpen} />}


            <div className="m-10 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {blogs.length > 0 ? (
                    blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
                ) : (
                    <p className="text-center text-gray-500 col-span-3">No blogs available</p>
                )}
            </div>

        </div>
    );
}
import CreateBlog from "./CreateBlog";

export default Home;
