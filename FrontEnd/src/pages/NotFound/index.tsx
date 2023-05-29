import { NavLink } from 'react-router-dom';

const NotFound = (): JSX.Element => {
    return (
        <section id='errorMain'>
            <h2>Error 404...</h2>
            <p>This page doesn't exist</p>
            <NavLink to='/marketplace' style={{ color: '#9A9A9A' }}><i>Click here to go to homepage</i></NavLink>
        </section >
    );
};

export default NotFound;