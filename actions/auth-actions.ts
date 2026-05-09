'use server'

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"

export async function login(formData: FormData) {
  try {
    await signIn("credentials", Object.fromEntries(formData))
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." }
        default:
          return { error: "Something went wrong. Please try again." }
      }
    }
    throw error
  }
}

export async function logout() {
  await signOut()
}
