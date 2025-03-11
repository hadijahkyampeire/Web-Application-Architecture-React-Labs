import { apiRequest } from "./util";

// Login Function
export const userLogin = async (email, password) => {
  return await apiRequest("post", "/auth/login", { email, password });
};

export const adminLogin = async (email, password) => {
  return await apiRequest("post", "/auth/admin", { email, password });
};