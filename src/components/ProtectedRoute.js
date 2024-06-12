import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({Component}) => {
    const token=localStorage.getItem("token");
    const [isLoggedIn]=useState(!!token);
  return (
    <div> {isLoggedIn ? <Component/> : <Navigate to='/login'/>}</div>
    
  )
}

export default ProtectedRoute;