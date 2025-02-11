import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function Cards({ blog }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/create", formData);
      if (response.data.success) {
        toast.success("Blog created successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        const errorMessage = error.response.data.message || "Something went wrong. Please try again.";

        switch (errorMessage) {
          case "All fields are required":
            toast.error("Please fill all fields!", { icon: "⚠️" });
            break;
          case "Something went wrong in creating blog":
            toast.error("Server error! Try again later.", { icon: "🚨" });
            break;
          default:
            toast.error(errorMessage, { icon: "❗" });
            break;
        }
      }
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <input
          type="text"
          placeholder="Enter title"
          value={formData.title}
          name="title"
          onChange={handleChange}
          className="mb-2 w-full p-2 border rounded"
        />
        <textarea
          placeholder="Enter content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="mb-3 w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default Cards;
