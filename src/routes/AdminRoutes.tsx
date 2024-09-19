// src/routes/AdminRoutes.tsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminUsers from '../pages/Admin/AdminUsers';
import AdminLogin from '../components/Auth/AdminLogin';
import { AdminIsLoggedIn } from '../components/Auth/AdminProtectedRoute';
import AdminSidebar from '../components/Admin/AdminSidebar'; // Import the sidebar
import AdminTeacherRequests from '../pages/Admin/AdminTeacherRequests';
import CourseOversight from '../pages/Admin/CourseOversight';
import PushNotifications from '../pages/Admin/PushNotifications';
import AdminUserReports from '../pages/Admin/AdminUserReports.tsx';

const AdminRoutes: React.FC = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname === '/admin/adminlogin';

    return (
        <div className="flex"> 
            {!isAdminRoute && <AdminSidebar />} 
            <div className={`flex-1  ${!isAdminRoute ? 'ml-64' : ''}`}>
                <Routes>
                    <Route path="/adminlogin" element={<AdminLogin />} />

                    <Route element={<AdminIsLoggedIn />}>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/users" element={<AdminUsers />} />
                        <Route path="/users-requests" element={<AdminTeacherRequests />} />
                        <Route path="/course-oversight" element={<CourseOversight />} />
                        <Route path="/push-notifications" element={<PushNotifications />} />
                        <Route path="/user-reports" element={<AdminUserReports />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );  
}

export default AdminRoutes;