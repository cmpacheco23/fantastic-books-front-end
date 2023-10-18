import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import * as profileService from "../../services/profileService"

import styles from './ProfileInfo.module.css'

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null)
  const [showCreateShelfButton, setShowCreateShelfButton] = useState(false)
  const { profileId } = useParams()
  const [isCreateShelfModalOpen, setIsCreateShelfModalOpen] = useState(false)
  const [shelfName, setShelfName] = useState("")
  const [editingShelfId, setEditingShelfId] = useState(null)
  const [editShelfName, setEditShelfName] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await profileService.getOneProfile(profileId)
        setProfile(profileData)
        setShowCreateShelfButton(true)
      } catch (err) {
        console.log(err)
      }
    }
    fetchProfile()
  }, [profileId])

  const handleCreateShelf = async () => {
    try {
      const newShelf = await profileService.createShelf({ name: shelfName }, profileId)
      if (newShelf) {
        setProfile(prevState => ({
          ...prevState,
          shelves: [...prevState.shelves, newShelf]
        }))
      }
      setIsCreateShelfModalOpen(false)
      setShelfName("")
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditShelf = async (shelfId) => {
    try {
      const editedShelf = await profileService.editShelf({ name: editShelfName }, profileId, shelfId)
      if (editedShelf) {
        setProfile(prevState => {
          const updatedShelves = prevState.shelves.map(shelf => shelf._id === shelfId ? editedShelf : shelf)
          return {
            ...prevState,
            shelves: updatedShelves
          }
        })
      }
      setEditShelfName("")
      setEditingShelfId(null)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main>
      {profile ? (
        <div>
          <div className={styles.spacer}>hello</div>
          <img className={styles.photo} src={profile.photo} alt="profile photo" />
          <h1 className={styles.name}>{profile.name}</h1>
          <h2>Books Collected:</h2>
          <h2>Shelves Created:</h2>
          {profile.shelves.map(shelf => (
              <div key={shelf._id}>{shelf.name}
                <button onClick={() => {
                  setEditingShelfId(shelf._id);
                  setEditShelfName(shelf.name);
                }}>
                  Edit
                </button>
                <div className={editingShelfId === shelf._id ? styles.modalOpen : styles.modalClose}>
                  <div className={styles.modalContent}>
                    <label>
                      Edit Shelf Name:
                      <input type="text" value={editShelfName} onChange={e => setEditShelfName(e.target.value)} />
                    </label>
                    <button onClick={() => handleEditShelf(shelf._id)}>Save</button>
                    <button onClick={() => setEditingShelfId(null)}>Cancel</button>
                  </div>
                </div>
              </div>
          ))}
          <div className={isCreateShelfModalOpen ? styles.modalOpen : styles.modalClose}>
            <label>
              Shelf Name:
              <input type="text" value={shelfName} onChange={e => setShelfName(e.target.value)} placeholder="Shelf Name"/>
            </label>
            <button onClick={handleCreateShelf}>Create Shelf</button>
            <button onClick={() => setIsCreateShelfModalOpen(false)}>Cancel</button>
          </div>
          {showCreateShelfButton && (
            <button onClick={() => setIsCreateShelfModalOpen(true)} className={styles.createShelfButton}>
              Create New Shelf
            </button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  )
}

export default ProfileInfo
