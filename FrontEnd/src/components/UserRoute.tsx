import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const UserRoute = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(sessionStorage.getItem('user')))
    useEffect(() => {
        setIsAuthenticated(Boolean(sessionStorage.getItem('user')));
    }, [location.pathname])

    return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

export default UserRoute;