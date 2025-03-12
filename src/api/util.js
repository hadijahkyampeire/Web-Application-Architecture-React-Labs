import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiRequest = async (method, url, data = {}, headers = {}) => {
  try {
    const response = await api({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export default api;