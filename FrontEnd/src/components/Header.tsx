import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { IEmployee, IUser } from '../types/types';
import { Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

type HeaderProps = {
    loggedUser: IUser;
    userInfo: IEmployee;
}

const Header = ({ loggedUser, userInfo }: HeaderProps) => {
    const location = useLocation();
    const path = location.pathname.replace('/', '');
    const headerName = useRef(path);

    const profileName = loggedUser?.name.split(' ')[0];

    const root = document.querySelector('#root') as HTMLElement;

    const onHamburger = () => {
        root.className = 'onHamburger';
    }

    const onClose = () => {
        root.className = 'onClose';
    }

    useEffect(() => {
        if (window.innerWidth < 769) {
            onClose();
        } else {
            root.className = '';
        }
    }, [location.pathname]);

    //Page title change
    if (path.includes('-')) {
        //If page title is with more than one word
        let [name1, name2]: string[] = path.split('-');
        name1 = name1.replace(name1[0], name1[0].toUpperCase());
        name2 = name2.replace(name2[0], name2[0].toUpperCase());
        document.title = `${name1} ${name2}`;
        headerName.current = `${name1} ${name2}`;
    } else {
        //If page title is one word
        const pageTitle = path.replace(path[0], path[0].toUpperCase());
        document.title = pageTitle;
        headerName.current = pageTitle;
    }

    return (
        <header>
            <NavLink id='logo' to='/marketplace'>
                <img src='/images/marketplace-mini-logo.png' alt='Marketplace-logo' />
            </NavLink>
            <span id='pageTitle'>{headerName.current}</span>
            <div className='profileGreet'>
                <span>Hi, {profileName}</span>
                <Avatar src={userInfo?.avatar || '/images/profile-image.png'} alt='Profile-picture' />
            </div>
            <a id='hamburger' onClick={onHamburger}>
                <MenuIcon />
            </a>
            <a id='closeMenu' onClick={onClose}>
                <CloseIcon />
            </a>
        </header>
    );
};

export default Header;