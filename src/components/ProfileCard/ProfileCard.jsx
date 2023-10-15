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
        <div className={styles.profileCard}>
        <img className={styles.photo} src={profile.photo} alt='profile photo'/>
        <h1> {profile.name} </h1>
        <h4>Number of Shelves: </h4>
        <h4>Number of Books: </h4>
        <Link to={`/profiles/${profile._id}`}>View Profile 
        </Link>
        <ProfileInfo profile={profile}/>
        </div>

    </main>
  )
}
 
export default ProfileCard