import { NavLink } from 'react-router-dom';

const NotFound = (): JSX.Element => {
    return (
        <div id='asideMain'>
            <main id='notFoundMain'>
                <h2>Error 404...</h2>
                <p>This page doesn't exist</p>
                <NavLink to='/marketplace'><i>Click here to go to homepage</i></NavLink>
            </main >
        </div>
    );
};

export default NotFound;