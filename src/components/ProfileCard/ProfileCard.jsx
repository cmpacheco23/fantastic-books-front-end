import { useState } from "react"
import { Link } from "react-router-dom"

import styles from './ProfileCard.module.css'

const ProfileCard = ({profile}) => {
  const [profileInfo, setProfileInfo] = useState(false)
  const handleProfileInfo = () =>{
    setProfileInfo(!profileInfo)
  }
  
  return (
    <div className="card">
      <img src={profile.photo} alt='profile photo'/>
      <h1> {profile.name} </h1>
      <h4>Number of Shelves: </h4>
      <h4>Number of Books: </h4>
      <Link to={`/profiles/${profile._id}`}>View Profile</Link>
      {/* add number of shelves
      add number of books */}
    </div>
  )
}
 
export default ProfileCard