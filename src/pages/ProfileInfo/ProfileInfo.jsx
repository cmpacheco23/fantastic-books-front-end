import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as profileService from "../../services/profileService";

import styles from './ProfileInfo.module.css'

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null)
  const { profileId } = useParams()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await profileService.getOneProfile(profileId);
        setProfile(profileData);
      } catch (err) {
        console.log(err)
      }
    };
    fetchProfile();
  }, [profileId]);

  return (
    <main>
      <div className={styles.spacer}></div>
      {/* need to add a button somewhere to return to the profiles */}
      {profile ? (
        <div>
          <img className={styles.photo} src={profile.photo} alt="profile photo" />
          <h1 className={styles.name}>{profile.name}</h1>
          {/* Render other profile information here */}
          <h2>Books Collected:</h2>
          <h2>Shelves Created:</h2>
        </div>
        // Enes add your shelves here in a div
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default ProfileInfo;
