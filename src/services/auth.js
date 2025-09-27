import axios from "axios"

const apiUri =
  import.meta.env.VITE_API_URI_LOCAL ||
  "https://cabstatus-backend-v2.vercel.app"

export const isAdminLoggedIn = () => {
  return localStorage.getItem("adminToken") !== null
}

export const loginAdmin = (token) => {
  localStorage.setItem("adminToken", token)
}

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken")
}

export const login = async ({ username, password }) => {
  const result = await axios.post(`${apiUri}/api/auth/login`, {
    username,
    password,
  })

  return result.data
}

export const getUser = async ({ token }) => {
  const result = await axios.get(`${apiUri}/api/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return result.data
}
