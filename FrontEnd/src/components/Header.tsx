import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { IUser } from '../types/types';

const Header = () => {
    const location = useLocation();
    const path = location.pathname.replace('/', '');
    const headerName = useRef(path);

    const user: IUser = JSON.parse(sessionStorage.getItem('user') as string);
    const profileName = user?.name.split(' ')[0];

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
                <img src='/images/profile-image.png' alt='Profile-picture' />
            </div>
            <a id='hamburger' onClick={onHamburger}>
                <svg width='30' height='30' viewBox='0 0 26 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M24.25 10.25H1.75C1.06 10.25 0.5 9.69 0.5 9C0.5 8.31 1.06 7.75 1.75 7.75H24.25C24.94 7.75 25.5 8.31 25.5 9C25.5 9.69 24.94 10.25 24.25 10.25ZM24.25 2.75H1.75C1.06 2.75 0.5 2.19 0.5 1.5C0.5 0.81 1.06 0.25 1.75 0.25H24.25C24.94 0.25 25.5 0.81 25.5 1.5C25.5 2.19 24.94 2.75 24.25 2.75ZM24.25 17.75H1.75C1.06 17.75 0.5 17.19 0.5 16.5C0.5 15.81 1.06 15.25 1.75 15.25H24.25C24.94 15.25 25.5 15.81 25.5 16.5C25.5 17.19 24.94 17.75 24.25 17.75Z'
                        fill='#ED1C25' />
                </svg>
            </a>
            <a id='closeMenu' onClick={onClose}>
                <svg width='30' height='30' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M19.8945 2.83008L11.9922 10.5L19.8945 18.1699L17.9023 20.1035L10 12.4336L2.09766 20.1035L0.105469 18.1699L8.00781 10.5L0.105469 2.83008L2.09766 0.896484L10 8.56641L17.9023 0.896484L19.8945 2.83008Z'
                        fill='#ED1C25' />
                </svg>
            </a>
        </header>
    );
};

export default Header;