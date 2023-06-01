import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { instance } from '../../authConfig';
import { NavLink } from 'react-router-dom';
import { IUser } from '../types/types';

const Sidebar = () => {
    const user: IUser = JSON.parse(sessionStorage.getItem('user') as string);
    const isAdmin = user?.memberType === 'Admin';
    const profileName = user?.name.split(' ')[0];
    const onLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: '/',
        });
    };

    return (
        <aside>
            <div className='profileGreet profileGreet2'>
                <img src='/images/profile-image.png' alt='Profile-picture' />
                <span>Hi, {profileName}</span>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/marketplace' className={({ isActive }) => `${isActive && 'active'} navButton`} >
                            <StorefrontOutlinedIcon className='icon' />
                            Marketplace
                        </NavLink>
                    </li>
                    {isAdmin &&
                        <>
                            <li>
                                <NavLink to='/inventory' className={({ isActive }) => `${isActive && 'active'} navButton`} >
                                    <AssignmentOutlinedIcon className='icon' />
                                    Inventory
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/pending-orders' className={({ isActive }) => `${isActive && 'active'} navButton`} >
                                    <PendingActionsOutlinedIcon className='icon' />
                                    Pending Orders
                                </NavLink>
                            </li>
                        </>
                    }
                    <li>
                        <NavLink to='/my-orders' className={({ isActive }) => `${isActive && 'active'} navButton`} >
                            <LocalMallOutlinedIcon className='icon' />
                            My Orders
                        </NavLink>
                    </li>
                    <li id='logout' >
                        <a className='navButton' onClick={onLogout}>
                            <LogoutOutlinedIcon className='icon' />
                            Logout
                        </a>
                    </li>
                </ul>
            </nav>
        </aside >
    )
}

export default Sidebar;