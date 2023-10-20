// npm modules
import { NavLink } from 'react-router-dom'
import Logo from '/assets/logo.png'

import styles from "./NavBar.module.css" 

const NavBar = ({ user, handleLogout }) => {
  return (
    
    <nav className={styles.nav}>
      
 
      <ul className={styles.right}>
        {user ? (
          
  <li><NavLink style={{ color: 'white'}} to={`/profiles/${user.profile}`} className={styles.navLink}>Welcome, {user.name}</NavLink>
        </li>) : null}
 
      </ul>
      <div className={`${styles.center} ${styles.flexCenter}`}>
        <ul >
        <li><NavLink to="/" className={styles.navLink}> <img src={'/assets/fantastic-beast.png'} className={styles.logo}/> </NavLink></li>
      </ul>
      </div>
      <div className={styles.left}>
        <ul>
          <li><NavLink style={{ color: 'white' }} to="/books" className={styles.navLink}> Books </NavLink></li>

          
          {user ? <li><NavLink style={{ color: 'white' }} to="/profiles" className={styles.navLink}>Profiles</NavLink></li> : '' }

        <li><NavLink style={{ color: 'white' }} to="/about" className={styles.navLink}> Devs</NavLink></li>
        
        
        </ul>
        
        
        {user ?
          <ul>
            <li><NavLink style={{ color: 'white' }} to="/auth/logout" onClick={handleLogout} className={styles.navLink}>Logout</NavLink></li>
            {/* <li><NavLink to="/auth/change-password">Change Password</NavLink></li>  */}
          </ul>
        :
          <ul>
            <li><NavLink style={{ color: 'black'}} to="/auth/login">Log In</NavLink></li>
            <li><NavLink style={{ color: 'black'}} to="/auth/signup">Sign Up</NavLink></li>  
          </ul>
        }
      </div>
    </nav>
  )
}

export default NavBar
