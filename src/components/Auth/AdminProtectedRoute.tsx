// // src/components/Auth/AdminProtectedRoute.tsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// interface AdminProtectedRouteProps {
//     isAuthenticated: boolean;
//     isAdmin: boolean;
//     children: React.ReactNode;
// }

// const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
//     isAuthenticated,
//     isAdmin,
//     children
// }) => {
//     if (!isAdmin) {
//         console.log(11111);
//         return <Navigate to="/admin/adminlogin" replace />;

//     }

//     if (!isAuthenticated) {
//         return <Navigate to="/unauthorized" replace />;
//     }


//     return <>{children}</>;
// };

// export default AdminProtectedRoute;


import { useAuth } from "../../hooks/useAuth";

import { Navigate, Outlet } from "react-router-dom"

export function AdminIsLoggedIn() {

    const { isAuthenticated, isAdminAuthenticated } = useAuth();
    console.log('isAdminAuthenticated', isAdminAuthenticated);


    return (
        isAdminAuthenticated ? <Outlet /> : <Navigate to='/auth/adminlogin' />
    )
}


export function AdminIsLoggedOut() {

    const { isAuthenticated, isAdminAuthenticated } = useAuth();
    console.log('isAdminAuthenticated Logout', isAdminAuthenticated);

    return (
        isAdminAuthenticated ? <Navigate to='/auth/adminlogin' /> : <Outlet />
    )
}


// export function StudentIsLoggedIn() {

//     const userId = useSelector((state: RootState) => state.student.email)
//     const userTocken = localStorage.getItem('studentToken')
//     return (
//         userId && userTocken ? <Outlet /> : <Navigate to='/signIn' />
//     )
// }


// export function StudentIsLoggedOut() {

//     const userId = useSelector((state: RootState) => state.student.email)
//     const userTocken = localStorage.getItem('studentToken')
//     return (
//         userId && userTocken ? <Navigate to='/home' /> : <Outlet />
//     )
// }


// export function InstructorIsLoggedIn() {

//     const instructorId = useSelector((state: RootState) => state.instructor.email)

//     return (
//         instructorId ? <Outlet /> : <Navigate to='/instructor/signIn' />
//     )
// }


// export function InstructorIsLoggedOut() {

//     const instructorId = useSelector((state: RootState) => state.instructor.email)

//     return (

//         instructorId ? <Navigate to='/instructor/dashboard' /> : <Outlet />

//     )
// }