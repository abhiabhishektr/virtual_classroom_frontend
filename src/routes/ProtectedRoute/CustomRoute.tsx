import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';

// Function to check if the user is logged in
const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

// Exclude problematic properties from RouteProps
type CustomRouteProps = Omit<RouteProps, 'element' | 'children'>;

// Type definition for the props
interface ProtectedRouteProps extends CustomRouteProps {
  element: React.ComponentType<any>;
}

// ProtectedRoute component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/auth/login" />;
};

// PublicRoute component
const PublicRoute: React.FC<ProtectedRouteProps> = ({ element: Element, ...rest }) => {
  return !isAuthenticated() ? <Element {...rest} /> : <Navigate to="/HomePage" />;
};

export { ProtectedRoute, PublicRoute };