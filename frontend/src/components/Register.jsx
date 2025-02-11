import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/Login/loginSlice';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/register', formData);
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
                        toast.error("Please fill all fields!");
                        break;
                    case "User already exists":
                        toast.error("User already exists. Please login.",);
                        break;
                    case "Internal server error":
                        toast.error("Server error! Try again later.",);
                        break;
                    default:
                        toast.error(errorMessage, { icon: "❗" });
                        break;
                }
            }
        }
        // console.log(formData);
        // console.log("Registration successful");

        finally {
            setLoading(false);
        }
    }


    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
                <h2 className='text-2xl font-bold text-center mb-6'>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='text-gray-700'>Name</label>
                        <input
                            type="text"
                            placeholder='Name'
                            onChange={handleChange}
                            name='name'
                            value={formData.name}
                            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700'>Email</label>
                        <input
                            type="email"
                            placeholder='Email'
                            onChange={handleChange}
                            name='email'
                            value={formData.email}
                            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700'>Password</label>
                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            value={formData.password}
                            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                            required
                        />
                    </div>

                    <button type='submit' disabled={loading} className='w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'>
                        {loading ? <ClipLoader size={20} color="#fff" /> : "Register"}
                    </button>


                </form>
            </div>
        </div>
    )
}

export default Register
