import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function BlogCard({ blog }) {

    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`/delete/${blog._id}`);
            // console.log(response.data);

            if (response.data.success) {

                window.location.reload();
                toast.success("Blog deleted successfully!");
            }
        } catch (error) {
            console.error(error);
            setLoading(false);

            if (error.response) {
                const errorMessage = error.response.data.message || "Something went wrong. Please try again.";

                switch (errorMessage) {
                    case "Blog not found":
                        toast.error("Blog not found!");
                        break;
                    case "You are not the author of this blog":
                        toast.error("You are not the author of this blog!");
                        break;
                    case "Something went wrong in deleting blog":
                        toast.error("Server error! Try again later.");
                        break;
                    default:
                        toast.error(errorMessage);
                        break;
                    }
                } else {
                    toast.error(" Network error. Please check your connection.");
                }
            }
        }

        const handleEdit = async () => {
            try {
                const response = await axios.put(`/update/${blog._id}`);
                // console.log(response.data);
                if (response.data.success) {
                    window.location.reload();
                }
            }
            catch (error) {
                console.error("Error updating blog:", error);
            }
        }
        return (
            <>
                {/* Blog Card */}
                <div
                    className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-gray-900">{blog.title}</h3>
                        <button
                            onClick={handleEdit}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
                            Edit Blog
                        </button>
                    </div>

                    <p className="text-gray-600 mt-2 line-clamp-3">{blog.content}</p>
                    <p className="text-sm text-gray-500 mt-3">
                        By: <span className="font-semibold">{blog.author_name}</span>
                    </p>
                    <div className="flex justify-evenly">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg gap-5 hover:bg-blue-600 transition-all"
                        >
                            Read More
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                        >
                            {loading ? <ClipLoader size={20} color="#fff" /> : "Delete Blog"}
                        </button>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div
                        className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-70 backdrop-blur-md z-50 transition-opacity duration-300 ease-in-out"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <div
                            className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-full h-full md:w-4/5 md:h-4/5 p-10 md:p-12 rounded-lg shadow-2xl relative flex flex-col overflow-hidden animate-fadeIn"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-5 right-5 text-white hover:text-gray-300 text-4xl font-bold transition duration-200"
                            >
                                &times;
                            </button>

                            {/* Scrollable Content */}
                            <div className="flex flex-col justify-center h-full overflow-y-auto">
                                <h3 className="text-5xl font-extrabold text-center drop-shadow-lg text-black">
                                    {blog.title}
                                </h3>

                                <div className="max-h-[70vh] overflow-y-auto py-5  bg-white bg-opacity-20 rounded-lg backdrop-blur-lg shadow-lg">
                                    <p className="text-lg leading-relaxed text-center text-black font-medium">
                                        {blog.content}
                                    </p>
                                </div>

                                <p className="text-md mt-1 text-center text-gray-200">
                                    By: <span className="font-semibold text-white">{blog.author_name}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                )}
            </>
        );
    }

    export default BlogCard;
