import React from 'react'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute() {
    const user = useSelector((state) => state.login.currentUser);
    return user ? <Outlet/> : <Navigate to="/login" />;
}

export default ProtectedRoute
