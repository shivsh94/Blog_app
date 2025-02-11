import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../features/Login/loginSlice';
import axios from 'axios';
import toast from 'react-hot-toast';


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.login.currentUser);
  
  const button = ["Home", "About", "Contact"];

  const handleLogout = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.get('/logout');
        if (response.data.success) {
            dispatch(deleteUser());
            toast.success("Logged out successfully!");
            navigate('/login');
        }
        else{
            console.log(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
}
  return (
    <div>
        <div className='bg-blue-200 h-25 w-full grid grid-cols-3'>
          <div className='text-3xl pl-10 h-25 flex items-center'>
            <h1>MY BLOG</h1>
          </div>

          <div className='mx-10 flex items-center text-lg'>
            {
              button.map((b, index) => {
                return (
                  <button key={index} onClick={() => navigate(b === "Home" ? "/" : `/${b.toLowerCase()}`)} className=' px-5 py-3 hover:bg-blue-500 hover:rounded-full hover:text-sm cursor-pointer'>{b}</button>
                )
              })
            }
          
          </div>

          <div className='flex items-center justify-end gap-3 text-xl p-5'>
          {user ? (
            <>
              <p className="text-lg font-medium">Welcome {user?.name}!</p>
              <button
                onClick={handleLogout}
                className="px-5 py-3 bg-red-500 text-white rounded-lg transition-all duration-300 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : location.pathname === "/register" ? (
            <button onClick={()=>navigate('/login')} className='hover:bg-blue-500 hover:rounded-full cursor-pointer px-5 py-3 flex items-center justify-center'>
              Login
            </button>
            ) : location.pathname === "/login" ? (
            <button onClick={()=>navigate('/register')} className='hover:bg-blue-500 hover:rounded-full cursor-pointer px-5 py-3 pr-10 flex items-center justify-center'>
              Register
            </button>
            ) : (
              <button onClick={()=>navigate('/login')} className='hover:bg-blue-500 hover:rounded-full
              cursor-pointer px-5 py-3 flex items-center justify-center'>
                Login
              </button>
            )

            }
          </div>

        </div>
    </div>
  )}

export default Header;
