import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

type LayoutProps = {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <>
            <Header />
            <div id="asideMain">
                <Sidebar />
                {children}
            </div>
        </>
    );
};

export default Layout;