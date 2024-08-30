import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminUsers from '../pages/Admin/AdminUsers';
import AdminLogin from '../components/Auth/AdminLogin';
import { AdminIsLoggedIn } from '../components/Auth/AdminProtectedRoute';
import AdminNavbar from '../components/Admin/AdminNavbar'; // Adjusted import path
import AdminTeacherRequests from '../pages/Admin/AdminTeacherRequests';
import CourseOversight from '../pages/Admin/CourseOversight';
import PushNotifications from '../pages/Admin/PushNotifications';

const AdminRoutes: React.FC = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname === '/admin/adminlogin';

    return (
        <div className="AdminRoutes">
            {!isAdminRoute && <AdminNavbar />}
            <Routes>
                {/* Admin login route */}
                <Route path="/adminlogin" element={<AdminLogin />} />

                {/* Protected routes for logged-in admin */}
                <Route element={<AdminIsLoggedIn />}>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/users" element={<AdminUsers />} />
                    <Route path="/users-requests" element={< AdminTeacherRequests/>} />
                    <Route path="/course-oversight" element={< CourseOversight/>} />
                    <Route path="/push-notifications" element={< PushNotifications/>} />
                </Route>
            </Routes>
        </div>
    );
}

export default AdminRoutes;



        //      {/* Routes for logged out admin */}
        //      <Route path="/" element={<AdminIsLoggedOut />}>
        //      <Route path="/" element={<AdminDashboard />} />
        //      {/* <Route path="/users" element={<AdminUsers />} /> */}
        //  </Route>
