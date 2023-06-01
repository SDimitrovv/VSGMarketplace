import { NavLink } from 'react-router-dom'

const Unauthorized = () => {
    return (
        <main id='unauthorizedMain'>
            <img src='/images/stani.gif' />
            <h2>You are not an admin!</h2>
            <NavLink to='/marketplace'><i>Click here to go to homepage</i></NavLink>
        </main>
    )
}

export default Unauthorized;