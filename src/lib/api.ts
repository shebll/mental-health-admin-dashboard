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
): Promise<{ data: Appointment[]; page: number; hasNext: boolean }> => {
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
    return { data: data, page, hasNext: data.length === pageSize };
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
): Promise<{ data: DoctorType[]; page: number; hasNext: boolean }> => {
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
export const fetchPosts = async (
  page: number,
  pageSize: number,
  filters: any,
  token: string
): Promise<{ data: Post[]; page: number; hasNext: boolean }> => {
  try {
    const { data } = await apiInstance.get(`/posts`, {
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
    return { data: data, page, hasNext: data.length === pageSize };
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
export const updateDoctor = async (
  token: string,
  doctorId: string,
  data: any
) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "photo" && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, String(data[key]));
      }
    });

    const { data: responseData } = await apiInstance.put(
      `/doctors/${doctorId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return responseData;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error updating doctor:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        if (error.response.data.errors) {
          const serverErrors = error.response.data.errors;
          Object.keys(serverErrors).forEach((key) => {
            console.error(`${key}: ${serverErrors[key][0]}`);
          });
        }
      }
    } else {
      console.error(
        "An unexpected error occurred while updating the doctor:",
        error
      );
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

export const registerUser = async (userData: any) => {
  try {
    const response = await apiInstance.post("auth/register", userData);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      throw error.response.data; // Throw error response to handle in react-query
    }
  } else {
    console.error("An unexpected error occurred:", error);
    throw new Error("An unexpected error occurred");
  }
};
