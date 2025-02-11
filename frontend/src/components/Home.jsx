import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import BlogCard from "./BlogCard";

function Home() {
    const [blogs, setBlogs] = useState([]);
    const fetchBlogs = async () => {
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

    useEffect(() => {
        fetchBlogs();
        // console.log("Blogs:", blogs);
        

    }, []);

    return (
        <div>

            <div className="h-25 w-full mt-2 text-3xl font-serif flex justify-center items-center">
                <p>Write Your Thoughts Here!!</p>
            </div>

            <div className="flex justify-center mt-5">
                <Cards />
            </div>


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

export default Home;
