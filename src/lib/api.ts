"use client";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://nexus-api-h3ik.onrender.com/api",
});
// const { token } = useAuth();

export const fetchAppointments = async (
  page: number,
  pageSize: number,
  filters: any
) => {
  const { data } = await apiInstance.get(`/appointments`, {
    params: {
      PageNumber: page,
      PageSize: pageSize,
      ...filters,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1MjA2OGMyZi1hNDgyLTQ0ODgtYWZiNi01MGM1YzUzNGNjZDEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUyMDY4YzJmLWE0ODItNDQ4OC1hZmI2LTUwYzVjNTM0Y2NkMSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJuYW1lIjoiQmFzZSBBZG1pbiIsInBob3RvVXJsIjoiIiwianRpIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlcyI6IkFkbWluIiwiZXhwIjoxNzIxODk3MDI0LCJpc3MiOiJodHRwczovL25leHVzLWFwaS1oM2lrLm9ucmVuZGVyLmNvbSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMzUifQ.wLG0GjwraPrxhed4IOvJhqxTkVdZdSGVmhGU6xcYDbA`,
    },
  });
  return data;
};

export const fetchAppointmentById = async (id: string) => {
  const { data } = await apiInstance.get(`/appointments/${id}`);
  return data;
};
