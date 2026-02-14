import { supabase } from "../lib/supabase"

export const loginService = async ({ email, password }) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log(error.message)
    return {
      error: true,
    }
  }

  return data
}

export const logoutService = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw error
  }
}
