import axios from "axios"
import { supabase } from "../lib/supabase"

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

export const login = async ({ email, password }) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  console.log(data)
  return {}
  // const result = await axios.post(`${apiUri}/api/auth/login`, {
  //   username,
  //   password,
  // })

  // return result.data
}

export const loginService = async ({ email, password }) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log(error)
    return {
      error: true,
    }
  }

  console.log(data)

  return data
}

export const getUser = async ({ token }) => {
  const result = await axios.get(`${apiUri}/api/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return result.data
}
