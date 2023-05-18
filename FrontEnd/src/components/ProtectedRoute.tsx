import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const isAuthenticated = sessionStorage.getItem('user');
    return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

export default ProtectedRoute;