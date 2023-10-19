import React, { useEffect, useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import * as profileService from "../../services/profileService"
import shelfImage from '../../assets/shelf.png'
import catOnShelfImage from '../../assets/blackcat.png'


import styles from './ProfileInfo.module.css'

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null)
  const [showCreateShelfButton, setShowCreateShelfButton] = useState(false)
  const { profileId } = useParams()
  const [isCreateShelfModalOpen, setIsCreateShelfModalOpen] = useState(false)
  const [shelfName, setShelfName] = useState("")
  const [editingShelfId, setEditingShelfId] = useState(null)
  const [editShelfName, setEditShelfName] = useState("")
  const createShelfInputRef = useRef(null)
  const editShelfInputRef = useRef(null)

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

  const handleDeleteShelf = async (shelfId) => {
    try {
      await profileService.deleteShelf(profileId, shelfId)
      setProfile(prevState => {
        const updatedShelves = prevState.shelves.filter(shelf => shelf._id !== shelfId)
        return {
          ...prevState,
          shelves: updatedShelves
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (editingShelfId && editShelfInputRef.current) {
      editShelfInputRef.current.focus()
    }
  }, [editingShelfId])
  
  useEffect(() => {
    if (isCreateShelfModalOpen && createShelfInputRef.current) {
      createShelfInputRef.current.focus()
    }
  }, [isCreateShelfModalOpen])

  const getShelfImage = (shelf) => {
    if (shelf && shelf.books && shelf.books.length > 0) {
      return null;
    } else {
      return <img src={catOnShelfImage} alt="Cat on Shelf" className={styles.catImage} />;
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
            <div className={styles.shelf} key={shelf._id}>
                <div className={styles.shelfContent}>
                    {/* Shelf name and buttons */}
                    <span>Shelf Name: {shelf.name}</span>

                    {/* Cat on shelf image */}
                    {getShelfImage(shelf)}

                    {/* Edit and Delete buttons */}
                    <button className={styles.edit} onClick={() => {
                        setEditingShelfId(shelf._id);
                        setEditShelfName(shelf.name);
                    }}>
                        ✏️
                    </button>
                    <button className={styles.delete} onClick={() => handleDeleteShelf(shelf._id)}>🗑️</button>
                </div>
                {/* Edit modal */}
                <div className={editingShelfId === shelf._id ? styles.modalOpen : styles.modalClose}>
                    <div className={styles.modalContent}>
                        <label>
                            Edit Shelf Name:
                            <input 
                                type="text" 
                                value={editShelfName} 
                                onChange={e => setEditShelfName(e.target.value)} 
                                ref={editShelfInputRef}
                            />
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
              <input type="text" value={shelfName} onChange={e => setShelfName(e.target.value)} placeholder="Shelf Name" ref={createShelfInputRef} />
            </label>
            <button onClick={handleCreateShelf}>Create Shelf</button>
            <button onClick={() => {
              setIsCreateShelfModalOpen(false); 
              setShelfName("")}}>
            Cancel
            </button>
          </div>
          {showCreateShelfButton && (
            <button onClick={() => setIsCreateShelfModalOpen(true)} className={styles.createShelfButton}>
              New Shelf
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