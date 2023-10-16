// npm modules
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/logo.png'

import styles from "./NavBar.module.css" 

const NavBar = ({ user, handleLogout }) => {
  return (
    
    <nav className={styles.nav}>
      
      <ul className={styles.right}>
        <li><NavLink to="/"> <img src={Logo} className={styles.logo}/> </NavLink></li>
        
        {user ? (
        <li>
          <NavLink to={`/profiles/${user.profile}`}>Welcome, {user.name}</NavLink>
        </li>) : null}
      </ul>
      <div className={styles.left}>
        <ul>
          <li><NavLink to="/books"> Search Books </NavLink></li>
          
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
