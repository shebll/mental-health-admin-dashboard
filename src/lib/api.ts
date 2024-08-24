"use client";
import axios, { AxiosError } from "axios";

const apiInstance = axios.create({
  baseURL: "https://nexus-api.runasp.net/api",
  headers: {},
});

export const fetchSummary = async (token: string) => {
  try {
    const { data } = await apiInstance.get("/admins/summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};

export const fetchAppointments = async (
  page: number,
  pageSize: number,
  filters: any,
  token: string
) => {
  try {
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
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};

export const fetchAppointmentById = async (token: string, id: string) => {
  try {
    const { data } = await apiInstance.get(`/appointments/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};

export const fetchDoctors = async (
  page: number,
  pageSize: number,
  filters: any,
  token: string
) => {
  try {
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
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};

export const fetchDoctorById = async (token: string, id: string) => {
  try {
    const { data } = await apiInstance.get(`/doctors/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};
export const deleteDoctorById = async (token: string, id: string) => {
  try {
    const { data } = await apiInstance.delete(`/doctors?userId=${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};

export const fetchUsers = async (
  page: number,
  pageSize: number,
  filters: any,
  token: string
): Promise<{ data: UserType[]; page: number; hasNext: boolean }> => {
  try {
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
    return { data: data, page, hasNext: data.length == pageSize };
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};

export const fetchUserById = async (token: string, id: string) => {
  try {
    const { data } = await apiInstance.get(`/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};
export const deleteUserById = async (token: string, id: string) => {
  try {
    const { data } = await apiInstance.delete(`/users?userId=${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};
export const deletePostById = async (token: string, id: string) => {
  try {
    const { data } = await apiInstance.delete(`/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};
export const deleteCommentById = async (
  token: string,
  postId: string,
  commentId: string
) => {
  try {
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
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};
export const deleteReplyById = async (
  token: string,
  replyId: string,
  commentId: string,
  postId: string
) => {
  try {
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
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error("Error :", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};
