import { jwtDecode } from "jwt-decode";
export async function login(email: string, password: string) {
  const response = await fetch(
    "https://nexus-api-h3ik.onrender.com/api/auth/signin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  const data = await response.json();
  return data.token;
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
