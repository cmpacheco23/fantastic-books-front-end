import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as 
profileService from "../../services/profileService";

import styles from './ProfileInfo.module.css';

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null);
  const [showCreateShelfButton, setShowCreateShelfButton] = useState(false);
  const { profileId } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await profileService.getOneProfile(profileId);
        setProfile(profileData);
        // Add logic to determine whether to show the button
        // For example, if the profile belongs to the logged-in user.
        // setShowCreateShelfButton(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [profileId]);

  return (
    <main>
      {profile ? (
        <div>
          <div className={styles.spacer}>hello</div>
          <img className={styles.photo} src={profile.photo} alt="profile photo" />
          <h1 className={styles.name}>{profile.name}</h1>
          {/* Render other profile information here */}
          <h2>Books Collected:</h2>
          <h2>Shelves Created:</h2>
          {/* Conditional rendering of the button */}
          {showCreateShelfButton && (
            <Link to="/create-shelf" className={styles.createShelfButton}>
              Create New Shelf
            </Link>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default ProfileInfo;

