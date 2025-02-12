import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";

const Comments = ({ blogId, setIsCommentOpen }) => {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({ comment: "" });

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/getcomments/${blogId}`);
                // console.log("Fetched comments:", response.data);

                if (response.data.success) {
                    setComments(Array.isArray(response.data.comments) ? response.data.comments : []);
                } else {
                    setComments([]);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
                toast.error("Failed to load comments.");
                setComments([]);
            }
        };

        if (blogId) {
            fetchComments();
        }
    }, [blogId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.comment.trim()) return;

        setLoading(true);
        try {
            const response = await axios.post(`/comment/${blogId}`, { comment: formData.comment });
            console.log("Comment response:", response.data);


            if (response.data.success) {
                toast.success("Comment added!");
                setFormData({ comment: "" });

                const updatedComments = await axios.get(`/getcomments/${blogId}`);
                if (updatedComments.data.success) {
                    setComments(updatedComments.data.comments);
                }
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md z-50"
            onClick={() => setIsCommentOpen(false)}
        >
            <div
                className="relative bg-gray-900 border border-gray-700 backdrop-blur-xl shadow-2xl rounded-2xl w-full max-w-md p-8 animate-fadeIn scale-95 transition-all duration-300 hover:scale-100"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={() => setIsCommentOpen(false)}
                    className="absolute top-4 right-4 text-gray-300 hover:text-white text-3xl font-bold transition duration-200"
                >
                    &times;
                </button>


                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 font-medium">Comment:</label>
                        <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-3 mt-1 bg-gray-800 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition"
                            placeholder="Write your comment..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700"
                        disabled={loading}
                    >
                        {loading ? <ClipLoader size={20} color="#fff" /> : "Submit Comment"}
                    </button>
                </form>

                <div className="max-h-64 overflow-y-auto mt-5 space-y-4 mb-4">
                    {comments.length > 0 ? (
                        comments
                            .filter(c => c && c.comment)
                            .map((c, index) => (
                                <div key={index} className="p-3 bg-gray-800 rounded-lg border border-gray-600">
                                    <p className="text-gray-100">{c.comment}</p>
                                    <p className="text-sm text-gray-400 mt-1">By: {c.author_name || "Anonymous"}</p>
                                </div>
                            ))
                    ) : (
                        <p className="text-gray-400 text-center">No comments yet.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Comments;
