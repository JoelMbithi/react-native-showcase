import { LoginProps, RegisterProps } from "@/api/types";

export const API_BASE_URL = "http://192.168.0.101:5000";



export async function registerUser({ name, email, password }: RegisterProps) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || "Registration failed" };
    }

    return { user: data.user };
  } catch (error) {
    console.error("Network Error:", error);
    return { error: "Network error" };
  }
}

export async function loginUser({ email, password}: LoginProps) {
   try {
     const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
     })
        const data = await response.json();
         if (!response.ok) {
      return { error: data.error || "Loginfailed" };
    }

    return { user: data.user };
   } catch (error) {
      console.error("Network Error:", error);
    return { error: "Network error" };
   }
}