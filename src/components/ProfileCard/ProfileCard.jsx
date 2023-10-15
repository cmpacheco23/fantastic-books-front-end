import { useState } from "react"

import styles from './ProfileCard.module.css'

const ProfileCard = ({profile}) => {
  const [profileInfo, setProfileInfo] = useState(false)
  const handleProfileInfo = () =>{
    setProfileInfo(!profileInfo)
  }
  
  return (
    <div className="card">
      <h1> {profile.name} </h1>
      <img src={profile.photo} alt='profile photo'/>
      {/* add number of shelves
      add number of books */}
    </div>
  )
}
 
export default ProfileCard