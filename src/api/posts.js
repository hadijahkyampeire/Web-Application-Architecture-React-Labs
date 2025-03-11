import { apiRequest } from "./util";

export const fetchAllPosts = async() => await apiRequest("get", "/posts");
export const fetchPostById = async(postId) => await apiRequest("get", `/posts/${postId}`);

export const fetchUserPosts = async (userId) => await apiRequest("get", `/users/${userId}/posts`);
export const fetchUserPostById = async (userId, postId) => await apiRequest("get", `/users/${userId}/posts/${postId}`);