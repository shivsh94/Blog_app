import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/Login/loginSlice.js'
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.login.currentUser);

    if(user){
       return navigate('/');
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("/login", formData);

            if (response.data.success) {
                dispatch(setUser(response.data.user));
                localStorage.setItem("token", response.data.token);

                toast.success("✅ User logged in successfully!", {
                    icon: "🎉",
                    duration: 3000,
                });

                navigate("/");
            }
        } catch (error) {
            console.error(error);

            if (error.response) {
                const errorMessage = error.response.data.message || "Something went wrong. Please try again.";


                switch (errorMessage) {
                    case "All fields are required":
                        toast.error("Please fill all fields!", { icon: "⚠️" });
                        break;
                    case "User not exist":
                        toast.error("No account found with this email.", { icon: "❌" });
                        break;
                    case "Invalid password":
                        toast.error("Incorrect password! Try again.", { icon: "🔑" });
                        break;
                    case "Something went wrong in login":
                        toast.error("Server error! Try again later.", { icon: "🚨" });
                        break;
                    default:
                        toast.error(errorMessage, { icon: "❗" });
                        break;
                }
            } else {
                toast.error("🌐 Network error. Please check your connection.", { icon: "🌐" });
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
                <h1 className='text-2xl font-bold text-center mb-6'>Login</h1>
                <form>
                    <div className='mb-4'>
                        <label className='text-gray-700 text-lg font-medium'>
                            Email
                        </label>
                        <input
                            type="email"
                            name='email'
                            onChange={handleChange}
                            value={formData.email}
                            placeholder='Enter Email'
                            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='text-gray-700 text-lg font-medium'>Password</label>
                        <input
                            type="text"
                            placeholder='Password'
                            onChange={handleChange}
                            value={formData.password}
                            name='password'
                            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                            required
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center`}>

                        {loading ? <ClipLoader size={20} color="#fff" /> : "Login"}
                    </button>

                </form>
            </div>

        </div>
    )
}

export default Login
