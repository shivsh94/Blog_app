import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";

const UpdateBlog = ({ blog, setIsEditOpen }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: blog?.title || "",
        content: blog?.content || ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`/update/${blog._id}`, {
                title: formData.title,
                content: formData.content
            });
            if (response.data.success) {
                toast.success("Blog updated successfully!");
                setIsEditOpen(false);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md z-50 transition-opacity duration-300"
            onClick={() => setIsEditOpen(false)}
        >
            <div
                className="relative bg-gray-900 bg-opacity-90 border border-gray-700 backdrop-blur-xl shadow-2xl rounded-2xl
        w-full max-w-md p-8 animate-fadeIn scale-95 transition-all duration-300 hover:scale-100"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsEditOpen(false)}
                    className="absolute top-4 right-4 text-gray-300 hover:text-white text-3xl font-bold transition duration-200"
                >
                    &times;
                </button>

                {/* Modal Title */}
                <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
                    Edit Blog
                </h2>

                {/* Edit Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title Field */}
                    <div>
                        <label className="block text-gray-300 font-medium">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 bg-gray-800 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                            required
                        />
                    </div>

                    {/* Content Field */}
                    <div>
                        <label className="block text-gray-300 font-medium">Content:</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="5"
                            className="w-full p-3 mt-1 bg-gray-800 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg 
                hover:from-blue-600 hover:to-purple-700 transition-all font-bold shadow-md"
                        disabled={loading}
                    >
                        {loading ? <ClipLoader size={20} color="#fff" /> : "Update Blog"}
                    </button>
                </form>

                {/* Subtle Glow Effect */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-blue-500 blur-3xl opacity-25"></div>
                <div className="absolute -bottom-10 right-1/2 transform translate-x-1/2 w-20 h-20 bg-purple-500 blur-3xl opacity-25"></div>
            </div>
        </div>
    );
};

export default UpdateBlog;
