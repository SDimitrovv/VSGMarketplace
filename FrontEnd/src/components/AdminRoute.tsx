import { Navigate, Outlet } from 'react-router-dom'
import { IUser } from '../types/types';

const AdminRoute = () => {
    const user: IUser = JSON.parse(sessionStorage.getItem('user') as string);

    return user?.memberType === 'Admin' ? <Outlet /> : <Navigate to='/marketplace' />;
}

export default AdminRoute;