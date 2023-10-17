const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/books`

export async function getBookDetails(volumeId) {
  try {
    const res = await fetch(`${BASE_URL}/${volumeId}`)
    return res.json()
  } catch (error) {
    console.log(error)
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
    console.log(error)
  }
}


export async function createComment(volumeId, commentFormData) {
  try {
    const response = await fetch(`${BASE_URL}/${volumeId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentFormData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const newComment = await response.json();
      return newComment;
    } else {
      console.error('Error creating comment:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Failed to create comment:', error);
    return null;
  }
}
