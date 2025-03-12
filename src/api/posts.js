import api from "./util";

export const fetchAllPosts = async () => await api.get("/posts");

export const fetchPost = async (postId) => await api.get(`/posts/${postId}`);

export const deletePost = async (postId) => await api.delete(`/posts/${postId}`);

export const addPost = async (data) => await api.post("/posts", data);