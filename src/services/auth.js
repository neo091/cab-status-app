export const isAdminLoggedIn = () => {
  return localStorage.getItem("adminToken") !== null
}

export const loginAdmin = (token) => {
  localStorage.setItem("adminToken", token)
}

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken")
}
