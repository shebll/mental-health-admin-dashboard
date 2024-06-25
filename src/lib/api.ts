"use client";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://nexus-api-h3ik.onrender.com/api",
});

export const fetchAppointments = async (
  page: number,
  pageSize: number,
  filters: any,
  token: string
) => {
  const { data } = await apiInstance.get(`/appointments`, {
    params: {
      PageNumber: page,
      PageSize: pageSize,
      ...filters,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const fetchAppointmentById = async (id: string) => {
  const { data } = await apiInstance.get(`/appointments/${id}`);
  return data;
};
