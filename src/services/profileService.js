import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/profiles`

async function getAllProfiles() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function getOneProfile(profileId){
  try {
    const res = await fetch(`${BASE_URL}/${profileId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function addPhoto(photoData) {
  try {
    const photoFormData = new FormData()
    photoFormData.append('photo', photoData)
    const profileId = tokenService.getUserFromToken().profile
    const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
      mode: 'no-cors',
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: photoFormData
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function createShelf(shelfData, profileId) {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}/shelves`, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(shelfData)
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function editShelf(shelfData, profileId, shelfId) {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}/shelves/${shelfId}`, {
      mode: 'no-cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(shelfData)
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteShelf(profileId, shelfId) {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}/shelves/${shelfId}`, {
      mode: 'no-cors',
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    if (res.status !== 200) throw new Error("Failed to delete shelf")
  } catch (err) {
    throw new Error(err)
  }
}

async function addBookToShelf(profileId, shelfId, volumeId) {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}/shelves/${shelfId}/books/${volumeId}`, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      }
    })
    return res.json()
  } catch (error) {
    (error)
  }
}

export { 
  getAllProfiles,
  addPhoto,
  getOneProfile,
  createShelf,
  editShelf,
  deleteShelf,
  addBookToShelf
}