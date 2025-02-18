import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../features/Login/loginSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.login.currentUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const button = ["Home", "About", "Contact"];

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/logout');
      if (response.data.success) {
        dispatch(deleteUser());
        toast.success("Logged out successfully!");
        navigate('/login');
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className='bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg w-full transition-all duration-300'>
      <div className='container mx-auto px-5 py-4 flex justify-between items-center'>
        {/* Animated Logo */}
        <h1 className='text-2xl font-bold text-gray-200 hover:scale-105 transition-transform duration-300 cursor-pointer'>
          MY BLOG
        </h1>

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-6 text-lg'>
          {button.map((b, index) => (
            <button
              key={index}
              onMouseEnter={() => setHoveredButton(index)}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => navigate(b === "Home" ? "/" : `/${b.toLowerCase()}`)}
              className='relative px-5 py-2 text-gray-300 overflow-hidden group'
            >
              <span className={`relative z-10 transition-transform duration-300 ${
                hoveredButton === index ? 'transform -translate-y-1' : ''
              }`}>
                {b}
              </span>
              <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-300 transform origin-left transition-all duration-300 ${
                hoveredButton === index ? 'scale-x-100' : 'scale-x-0'
              }`} />
            </button>
          ))}
        </div>

        <div className='hidden md:flex items-center gap-4'>
          {user ? (
            <>
              <p className='text-lg font-medium text-gray-300'>Welcome {user?.name}!</p>
              <button
                onClick={handleLogout}
                className='px-5 py-2 bg-red-700 text-gray-200 rounded-lg transform hover:scale-105 hover:bg-red-800 transition-all duration-300 hover:shadow-lg'
              >
                Logout
              </button>
            </>
          ) : location.pathname === "/register" ? (
            <button 
              onClick={() => navigate('/login')}
              className='px-5 py-2 bg-gray-700 text-gray-200 rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg'
            >
              Login
            </button>
          ) : location.pathname === "/login" ? (
            <button 
              onClick={() => navigate('/register')}
              className='px-5 py-2 bg-gray-700 text-gray-200 rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg'
            >
              Register
            </button>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className='px-5 py-2 bg-gray-700 text-gray-200 rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg'
            >
              Login
            </button>
          )}
        </div>

        <button 
          className='md:hidden text-2xl text-gray-300 transform hover:rotate-180 transition-all duration-300'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu with Slide Animation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className='flex flex-col items-center bg-gray-800/90 backdrop-blur-sm py-4 space-y-2'>
          {button.map((b, index) => (
            <button
              key={index}
              onClick={() => {
                navigate(b === "Home" ? "/" : `/${b.toLowerCase()}`);
                setMenuOpen(false);
              }}
              className='px-5 py-2 text-lg text-gray-300 hover:bg-gray-700 rounded-lg w-4/5 text-center transform hover:scale-105 transition-all duration-300'
            >
              {b}
            </button>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className='px-5 py-2 bg-red-700 text-gray-200 rounded-lg w-4/5 mt-3 transform hover:scale-105 hover:bg-red-800 transition-all duration-300'
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate(location.pathname === "/register" ? "/login" : "/register");
                setMenuOpen(false);
              }}
              className='px-5 py-2 bg-gray-700 text-gray-200 rounded-lg w-4/5 mt-3 transform hover:scale-105 transition-all duration-300'
            >
              {location.pathname === "/register" ? "Login" : "Register"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;