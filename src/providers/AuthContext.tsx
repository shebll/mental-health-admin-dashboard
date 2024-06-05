"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { decodeToken } from "@/utlis/auth";

interface User {
  email: string;
  name: string;
  roles: string;
  photoUrl: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const storedToken = cookies.token;
    if (storedToken) {
      (async () => {
        try {
          const decodedUser = decodeToken(storedToken);
          setToken(storedToken);
          setUser(decodedUser);
        } catch (error) {
          console.error("Invalid token:", error);
          destroyCookie(null, "token");
          setToken(null);
          setUser(null);
        }
      })();
    }
  }, []);

  const login = async (token: string) => {
    try {
      const decodedUser = decodeToken(token);
      setToken(token);
      setUser(decodedUser);
      setCookie(null, "token", token, { maxAge: 7 * 24 * 60 * 60, path: "/" }); // Set cookie to expire in 7 days
      router.push("/");
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    destroyCookie(null, "token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
