import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminUsers from '../components/Admin/AdminUsers';
import AdminLogin from '../components/Auth/AdminLogin';
import { AdminIsLoggedIn, AdminIsLoggedOut } from '../components/Auth/AdminProtectedRoute';

const AdminRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/adminLogin" element={<AdminLogin />} />
            
            {/* Routes for logged out admin */}
            <Route path="/" element={<AdminIsLoggedOut />}>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/users" element={<AdminUsers />} />
            </Route>

            {/* Routes for logged in admin */}
            <Route path="/" element={<AdminIsLoggedIn />}>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/users" element={<AdminUsers />} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;
