// src/components/Auth/AdminProtectedRoute.tsx

import  { useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function AdminIsLoggedIn() {
    const { isAdminAuthenticated, checkAuthTokens } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthTokens();
        setIsLoading(false);
    }, [checkAuthTokens]);

    if (isLoading) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    return isAdminAuthenticated ? <Outlet /> : <Navigate to='/admin/adminlogin' />;
}