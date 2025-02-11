import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Register from "./components/Register";
import Login from "./components/Login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./features/Login/loginSlice.js";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {Toaster, toast} from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_URI;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));  
    if (storedUser) {  
      const verifyUser = async () => {
        try {
          const response = await axios.get("/isverify");
          if (response.data.success) {
            dispatch(setUser(response.data.user));
          } else {
            dispatch(setUser(null));
            localStorage.removeItem("user");
          }
        } catch (error) {
          dispatch(setUser(null));
          localStorage.removeItem("user");
        }
      };
      verifyUser();
    }
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Route */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
