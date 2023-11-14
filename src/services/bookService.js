import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/books`



export async function getBookDetails(volumeId) {
  try {
    const res = await fetch(`${BASE_URL}/${volumeId}`)
    const bookData = await res.json()

    const bookDetailsWithComments = {
      ...bookData,
      comments: bookData.comments || [], 
    }
    return bookDetailsWithComments
  } catch (error) {
    (error)
  }
}


export async function bookSearch (data) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res.json()
  } catch (error) {
    (error)
  }
}





export async function createComment(volumeId, commentFormData) {
  try {
    const response = await fetch(`${BASE_URL}/${volumeId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentFormData),
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const newComment = await response.json()
      return newComment
    } else {
      console.error('Error creating comment:', response.status)
      return null
    }
  } catch (error) {
    console.error('Failed to create comment:', error)
    return null
  }
}

export async function getComments(volumeId) {
  try {
    const res = await fetch(`${BASE_URL}/${volumeId}/comments`)
    if (res.ok) {
      const comments = await res.json()
      return comments
    } else {
      console.error('Error fetching comments:', res.status)
      return []
    }
  } catch (error) {
    console.error('Failed to fetch comments:', error)
    return []
  }
}



export const updateComment = async (volumeId, commentId, commentFormData) => {
  (commentFormData)
  try {
    console.log('VOLUMEID', volumeId)
    console.log('COMMENTID', commentId)
    const res = await fetch(`${BASE_URL}/${volumeId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentFormData)
    })
    return res.json()
  } catch (error) {
    (error)
  }
}

export const deleteComment = async (volumeId, commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${volumeId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
    })
    return res.json()
  } catch (error) {
    (error)
  }
}
