"use client";
import { useAuth } from "@/context/AuthContext";

export const useFetchWithAuth = () => {
  const { token } = useAuth();

  return async (input: RequestInfo, init?: RequestInit) => {
    const headers = {
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(input, { ...init, headers });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    return response.json();
  };
};
