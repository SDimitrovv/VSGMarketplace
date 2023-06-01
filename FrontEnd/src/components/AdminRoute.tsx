import { Outlet } from 'react-router-dom'
import { IUser } from '../types/types';
import Unauthorized from '../pages/Unauthorized';

const AdminRoute = () => {
    const user: IUser = JSON.parse(sessionStorage.getItem('user') as string);

    return user?.memberType === 'Admin' ? <Outlet /> : <Unauthorized />;
}

export default AdminRoute;