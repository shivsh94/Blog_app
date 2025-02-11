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
    <nav className='bg-blue-200 shadow-md w-full'>
      <div className='container mx-auto px-5 py-4 flex justify-between items-center'>
        {/* Logo */}
        <h1 className='text-2xl font-bold text-gray-800'>MY BLOG</h1>

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-6 text-lg'>
          {button.map((b, index) => (
            <button
              key={index}
              onClick={() => navigate(b === "Home" ? "/" : `/${b.toLowerCase()}`)}
              className='px-5 py-2 hover:bg-blue-500 hover:rounded-full hover:text-white transition-all'
            >
              {b}
            </button>
          ))}
        </div>

        <div className='hidden md:flex items-center gap-4'>
          {user ? (
            <>
              <p className='text-lg font-medium'>Welcome {user?.name}!</p>
              <button
                onClick={handleLogout}
                className='px-5 py-2 bg-red-500 text-white rounded-lg transition-all duration-300 hover:bg-red-600'
              >
                Logout
              </button>
            </>
          ) : location.pathname === "/register" ? (
            <button onClick={() => navigate('/login')} className='px-5 py-2 hover:bg-blue-500 hover:rounded-full hover:text-white'>
              Login
            </button>
          ) : location.pathname === "/login" ? (
            <button onClick={() => navigate('/register')} className='px-5 py-2 hover:bg-blue-500 hover:rounded-full hover:text-white'>
              Register
            </button>
          ) : (
            <button onClick={() => navigate('/login')} className='px-5 py-2 hover:bg-blue-500 hover:rounded-full hover:text-white'>
              Login
            </button>
          )}
        </div>

        <button className='md:hidden text-2xl' onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className='md:hidden flex flex-col items-center bg-blue-100 py-4'>
          {button.map((b, index) => (
            <button
              key={index}
              onClick={() => {
                navigate(b === "Home" ? "/" : `/${b.toLowerCase()}`);
                setMenuOpen(false);
              }}
              className='px-5 py-2 text-lg hover:bg-blue-500 hover:rounded-full hover:text-white w-full text-center'
            >
              {b}
            </button>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className='px-5 py-2 bg-red-500 text-white rounded-lg w-full mt-3 hover:bg-red-600'
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate(location.pathname === "/register" ? "/login" : "/register");
                setMenuOpen(false);
              }}
              className='px-5 py-2 hover:bg-blue-500 hover:rounded-full hover:text-white w-full mt-3'
            >
              {location.pathname === "/register" ? "Login" : "Register"}
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Header;
