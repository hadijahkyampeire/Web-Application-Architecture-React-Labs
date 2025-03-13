import { apiRequest } from './util';

export const userLogin = async (email, password) => {
  return await apiRequest("post", "/auth/login", { email, password });
};
