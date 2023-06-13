import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import DevicesIcon from '@mui/icons-material/Devices';
import { IUser, IEmployee } from '../types/types';
import { instance } from '../../authConfig';
import { NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';

type SidebarProps = {
    loggedUser: IUser;
    userInfo: IEmployee;
}

const Sidebar = ({ loggedUser, userInfo }: SidebarProps) => {
    const isAdmin = loggedUser?.memberType === 'Admin';
    const profileName = loggedUser?.name.split(' ')[0];
    const onLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: '/',
        });
    };

    return (
        <aside>
            <div className='profileGreet profileGreet2'>
                <Avatar src={userInfo?.avatar || '/images/profile-image.png'} alt='Profile-picture' />
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
                            <li>
                                <NavLink to='/lent-items' className={({ isActive }) => `${isActive && 'active'} navButton`} >
                                    <DevicesOtherIcon className='icon' />
                                    Lent Items
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
                    <li>
                        <NavLink to='/my-items' className={({ isActive }) => `${isActive && 'active'} navButton`} >
                            <DevicesIcon className='icon' />
                            My Items
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