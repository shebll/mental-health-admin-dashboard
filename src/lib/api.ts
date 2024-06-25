"use client";
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

export const fetchAppointmentById = async (token: string, id: string) => {
  const { data } = await apiInstance.get(`/appointments/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const fetchDoctors = async (
  page: number,
  pageSize: number,
  filters: any,
  token: string
) => {
  const { data } = await apiInstance.get(`/doctors`, {
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

export const fetchDoctorById = async (token: string, id: string) => {
  const { data } = await apiInstance.get(`/doctors/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
