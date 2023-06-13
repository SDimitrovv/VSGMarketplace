import { ReactNode, Suspense } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useGetEmployeesQuery } from '../utils/userApi';
import { IEmployee, IUser } from '../types/types';

type LayoutProps = {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    const { data: users } = useGetEmployeesQuery();
    const loggedUser: IUser = JSON.parse(sessionStorage.getItem('user') as string);
    const userInfo = users?.find(u => u.name === loggedUser.name) as IEmployee;

    return (
        <>
            <Header loggedUser={loggedUser} userInfo={userInfo} />
            <div id='asideMain'>
                <Sidebar loggedUser={loggedUser} userInfo={userInfo} />
                <Suspense>
                    {children}
                </Suspense>
            </div>
        </>
    );
};

export default Layout;