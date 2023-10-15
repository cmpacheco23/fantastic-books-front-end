import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as profileService from "../../services/profileService";

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
      {profile ? (
        <div>
          <h1>{profile.name}</h1>
          <img src={profile.photo} alt="profile photo" />
          {/* Render other profile information here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default ProfileInfo;
