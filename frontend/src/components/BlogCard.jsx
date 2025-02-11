import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import UpdateBlog from "./UpdateBlog";

function BlogCard({ blog }) {
    const [loading, setLoading] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`/delete/${blog._id}`);
            if (response.data.success) {
                toast.success("Blog deleted successfully!");
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <>
            {/* Blog Card */}
            <div className="relative p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-900">{blog.title}</h3>
                    <button
                        onClick={() => setIsEditOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
                        Edit Blog
                    </button>
                </div>

                <p className="text-gray-600 mt-2 line-clamp-3">{blog.content}</p>
                <p className="text-sm text-gray-500 mt-3">
                    By: <span className="font-semibold">{blog.author_name}</span>
                </p>

                {/* Buttons: Read More & Delete */}
                <div className="flex justify-evenly mt-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                    >
                        Read More
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                    >
                        {loading ? <ClipLoader size={20} color="#fff" /> : "Delete Blog"}
                    </button>
                </div>
            </div>

            {/* Read More Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md z-50 transition-opacity duration-300"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative bg-gray-900 bg-opacity-90 border border-gray-700 backdrop-blur-xl shadow-2xl rounded-2xl
                              w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 animate-fadeIn scale-95 transition-all duration-300 hover:scale-100"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-300 hover:text-white text-3xl font-bold transition duration-200"
                        >
                            &times;
                        </button>

                        {/* Blog Title with Brighter Gradient */}
                        <h2 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
                            {blog.title}
                        </h2>

                        {/* Scrollable Content */}
                        <div className="max-h-[60vh] overflow-y-auto p-5 bg-gray-800 bg-opacity-70 rounded-lg backdrop-blur-lg shadow-lg border border-gray-600">
                            <p className="text-lg leading-relaxed text-center text-gray-200 font-medium tracking-wide">
                                {blog.content}
                            </p>
                        </div>

                        {/* Author Info */}
                        <p className="text-md mt-5 text-center text-gray-400 font-semibold tracking-wider shadow-md">
                            By: <span className="text-blue-300 font-bold">{blog.author_name}</span>
                        </p>

                        {/* Subtle Glow Effect */}
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-blue-500 blur-3xl opacity-25"></div>
                        <div className="absolute -bottom-10 right-1/2 transform translate-x-1/2 w-20 h-20 bg-purple-500 blur-3xl opacity-25"></div>
                    </div>
                </div>
            )}




            {/* Update Blog Modal */}
            {isEditOpen && <UpdateBlog blog={blog} setIsEditOpen={setIsEditOpen} />}
        </>
    );
}

export default BlogCard;
