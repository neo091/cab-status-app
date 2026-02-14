import { supabase } from "../lib/supabase"

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

  return data
}
