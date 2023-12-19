import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const auth = isAuthenticated();
    return auth ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;

function isAuthenticated() {
    const user = localStorage.getItem('user');
    return Boolean(user);
}