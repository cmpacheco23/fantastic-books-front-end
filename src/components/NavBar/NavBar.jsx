// npm modules
import { NavLink } from 'react-router-dom'

import styles from "./NavBar.module.css" 

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav className={styles.nav}>
      
      <ul className={styles.right}>
        <li><NavLink to="/"> Home</NavLink></li>
        
        {user ? <li>Welcome, {user.name}</li> : '' }
      </ul>
      
      <div className={styles.left}>
        <ul>
          <li><NavLink to="/search-books"> Search Books </NavLink></li>
          
          {user ? <li><NavLink to="/profiles">Profiles</NavLink></li> : '' }

          <li><NavLink to="/about"> About Us</NavLink></li>
        
        
        </ul>
        
        
        {user ?
          <ul>
            <li><NavLink to="/auth/logout" onClick={handleLogout}>Logout</NavLink></li>
            {/* <li><NavLink to="/auth/change-password">Change Password</NavLink></li>  */}
          </ul>
        :
          <ul>
            <li><NavLink to="/auth/login">Log In</NavLink></li>
            <li><NavLink to="/auth/signup">Sign Up</NavLink></li>  
          </ul>
        }
      </div>
    </nav>
  )
}

export default NavBar
