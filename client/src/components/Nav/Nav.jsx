import {Link} from 'react-router-dom'
import "./nav.css"

const Nav = () => {
    return(
        <header>
            <nav>
                <div className='navbar'>
                    <Link to = '/'>Home</Link>
                
                    <Link to = '/dashboard'>Playlists</Link>
                    <Link to = "/login">Log In</Link>
                    <Link to = "/register">Sign Up</Link>
                </div>            
            </nav>
        </header>
    )
}

export default Nav