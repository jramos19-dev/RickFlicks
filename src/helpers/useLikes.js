import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL || '/api'

export const add = async (like) => {
  await axios.post(`${apiUrl}/likes`, { like })
}

export const countByObjectId = async (objectId) => {
  return await axios.get(`${apiUrl}/count`, {
    params: { objectId }
  })
}
