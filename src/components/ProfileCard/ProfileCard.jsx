import { useState } from "react"
import { Link } from "react-router-dom"

import ProfileInfo from "../../pages/ProfileInfo/ProfileInfo"

import styles from './ProfileCard.module.css'

const ProfileCard = ({profile}) => {
  const [profileInfo, setProfileInfo] = useState(false)
  const handleProfileInfo = () =>{
    setProfileInfo(!profileInfo)
  }
  
  
  return (
    <main className={styles.main}>
        <div className={styles.profileCard} onClick={handleProfileInfo} >
          <Link to={`/profiles/${profile._id}`}>
            <img className={styles.photo} src={profile.photo} alt='profile photo'/>
            <h1 className={styles.name}> {profile.name} </h1>
            <h4>Number of Shelves: </h4>
            <h4>Number of Books: </h4>
          
          
          </Link>
        <Link to={`/profiles/${profile._id}`}>View Profile</Link>
        {profileInfo && <ProfileInfo profile={profile}/>}
        </div>

    </main>
  )
}

export default ProfileCard