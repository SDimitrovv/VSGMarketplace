import { NavLink } from "react-router-dom"

const Unauthorized = () => {
    return (
        <main style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <img src='/images/stani.gif' style={{ height: '600px', width: '1000px' }} />
            </div>
            <h2>You are not an admin!</h2>
            <div>
                <NavLink to='/marketplace' style={{ color: '#000' }}><i>Click here to go to Marketplace</i></NavLink>
            </div>
        </main>
    )
}

export default Unauthorized;