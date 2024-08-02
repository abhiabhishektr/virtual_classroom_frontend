// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface ProtectedRouteProps {
  requiredRole: string;
}

const TeacherProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { role } = useSelector((state: RootState) => state.profile);

  if (role !== requiredRole) {
    return <Navigate to="/profile/teacher-registration" replace />;
  }

  return <Outlet />;
};

export default TeacherProtectedRoute;
