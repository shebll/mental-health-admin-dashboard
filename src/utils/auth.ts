import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
export async function login(email: string, password: string) {
  try {
    const response = await fetch(
      "https://nexus-api.runasp.net/api/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    return data.token;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.message);
      if (error.response) {
        console.error("Error data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
}

interface TokenPayload {
  id: string;
  email: string;
  name: string;
  roles: string;
  photoUrl: string;
}

export function decodeToken(token: string): TokenPayload {
  const decoded = jwtDecode<any>(token);
  return {
    id: decoded.uid,
    email: decoded.email,
    name: decoded.name,
    roles: decoded.roles,
    photoUrl: decoded.photoUrl,
  };
}
