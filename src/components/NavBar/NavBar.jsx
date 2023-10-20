// npm modules
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '/assets/logo.png'

import styles from "./NavBar.module.css" 

const NavBar = ({ user, handleLogout }) => {

  const [showLogo, setShowLogo] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowLogo(false);
      } else {
        setShowLogo(true); 
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])
  return (
    <nav className={styles.nav}>
      <ul className={styles.right}>
        {user ? (
        <li><NavLink style={{ color: 'white'}} to={`/profiles/${user.profile}`} className={styles.navLink}>Welcome, {user.name}</NavLink>
        </li>) : null}
      </ul>
      <div className={`${styles.center} ${styles.flexCenter}`}>
        <ul >

          <li>
            <NavLink to="/" className={styles.navLink}>
              {showLogo && (<img src={'/assets/booklogo.png'} className={styles.logo} alt="Logo" />)}
            </NavLink>
          </li>
        </ul>

        <li>
          <NavLink to="/" className={styles.navLink}>
            {showLogo && (
            <img src={'/assets/booklogo.png'} className={styles.logo} alt="Logo" />
            )}
          </NavLink>
        </li>
      </ul>

      </div>
      <div className={styles.left}>
        <ul>
          <li><NavLink style={{ color: 'white' }} to="/books" className={styles.navLink}> Books </NavLink></li>
          {user ? 
          <li><NavLink style={{ color: 'white' }} to="/profiles" className={styles.navLink}>Profiles</NavLink></li> : '' }
          <li><NavLink style={{ color: 'white' }} to="/about" className={styles.navLink}> Devs</NavLink></li>
        </ul>
        {user ?
          <ul>
            <li><NavLink style={{ color: 'white' }} to="/auth/logout" onClick={handleLogout} className={styles.navLink}>Logout</NavLink></li>
          </ul> :
          <ul>
            <li><NavLink style={{ color: 'white'}} to="/auth/login" className={styles.navLink}>LogIn</NavLink ></li>
            <li><NavLink style={{ color: 'white'}} to="/auth/signup" className={styles.navLink}>Sign Up</NavLink></li>  
          </ul>
        }
      </div>
    </nav>
  )
}

export default NavBar
