const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/google`

export async function getBookDetails(bookId) {
  const res = await fetch(`${BASE_URL}/${bookId}`)
  return res.json()
}

async function bookSearch (searchTerm) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify({searchTerm: searchTerm}),
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