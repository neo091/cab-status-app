import axios from "axios"

const apiUri =
  import.meta.env.VITE_API_URI_LOCAL ||
  "https://cabstatus-backend-v2.vercel.app"

export const addTrip = async ({ data, token }) => {
  const response = await axios.post(`${apiUri}/api/trip`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.status !== 200) return { message: "error" }
  return response.data
}

export const getTrips = async ({ token, page = 1, limit = 5 }) => {
  const response = await axios.get(
    `${apiUri}/api/trip?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

export const deleteTrip = async ({ token, id }) => {
  const result = await axios.delete(`${apiUri}/api/trip/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return result.data
}
