import React from 'react';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
const AdminRoute = ({ Component}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    if (!user || user.role !== 'admin') {
        return <Navigate to="/auth/Sign-in" />;
      }
      return <Component />;
};

export default AdminRoute;
