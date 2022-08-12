import {Link} from 'react-router-dom'

const Nav = () => {
    return(
        <header>
            <nav>
                <div>
                    <Link to = '/'>Home</Link>
                    <Link to = '/dashboard'>Playlists</Link>
                </div>
                <div>
                    <Link to = "/register">Sign Up</Link>
                    <Link to = "/login">Log In</Link>
                </div>            
            </nav>
        </header>
    )
}

export default Nav