import { NavLink } from "react-router-dom";

const NotFound = (): JSX.Element => {

    return (
        <section id='errorSection'>
            <h2>Error 404...</h2>
            <p>This page doesn't exist</p>
            <NavLink to='/' style={{ color: "#9a9a9a" }}><i>Click here to go to homepage</i></NavLink>
        </section >
    );
};

export default NotFound;