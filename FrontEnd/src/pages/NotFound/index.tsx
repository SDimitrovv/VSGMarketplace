import { NavLink } from "react-router-dom";

const NotFound = (): JSX.Element => {

    return (
        <main id='errorMain'>
            <h2>Error 404...</h2>
            <p>This page doesn't exist</p>
            <NavLink to='/'><i>Click here to go to homepage</i></NavLink>
        </main >
    );
};

export default NotFound;