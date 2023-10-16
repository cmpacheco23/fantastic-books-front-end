const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/books`

export async function getBookDetails(volumeId) {
  try {
    const res = await fetch(`${BASE_URL}/${volumeId}`)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function bookSearch (data) {
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


export {
  bookSearch
}