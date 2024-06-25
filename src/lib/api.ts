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
export const deleteDoctorById = async (token: string, id: string) => {
  const { data } = await apiInstance.delete(`/doctors`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      doctorId: id,
    },
  });
  return data;
};

export const fetchUsers = async (
  page: number,
  pageSize: number,
  filters: any,
  token: string
) => {
  const { data } = await apiInstance.get(`/users`, {
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

export const fetchUserById = async (token: string, id: string) => {
  const { data } = await apiInstance.get(`/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const deleteUserById = async (token: string, id: string) => {
  const { data } = await apiInstance.delete(`/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId: id,
    },
  });
  return data;
};
export const deletePostById = async (token: string, id: string) => {
  const { data } = await apiInstance.delete(`/posts/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const deleteCommentById = async (
  token: string,
  postId: string,
  commentId: string
) => {
  const { data } = await apiInstance.delete(
    `/posts/${postId}/comments/${commentId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
export const deleteReplyById = async (
  token: string,
  replyId: string,
  commentId: string,
  postId: string
) => {
  const { data } = await apiInstance.delete(
    `/posts/${postId}/comments/${commentId}/replies/${replyId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
