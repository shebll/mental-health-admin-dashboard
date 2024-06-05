"use client";
import { useAuth } from "@/providers/AuthContext";
import { useFetchWithAuth } from "@/utlis/fetchWithAuth";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

export default function Home() {
  const { logout, user, token } = useAuth();
  const [data, setData] = useState(null);

  console.log(user);

  return (
    <div>
      <Dashboard />
    </div>
  );
}
