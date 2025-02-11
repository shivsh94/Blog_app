import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';


const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("/getblogs");

                if (response.data.success) {
                    setBlogs(response.data.blogs);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div  >
             <div className="mt-15 m-10 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {blogs.length > 0 ? (
                    blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
                ) : (
                    <p className="text-center text-gray-500 col-span-3">No blogs available</p>
                )}
            </div>
        </div>
    );
};

export default MyBlogs;
