"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Dashboard from "./Dashboard";

export default function Home() {
  return <Dashboard />;
}
