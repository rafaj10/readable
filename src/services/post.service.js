import axios from '../utils/axios.instance';
import { apiConstants } from "../constants";

export const getPosts = () => {
  return axios.get(`${apiConstants.API}posts`);
};

export const getPostsByCategory = (category) => {
  return axios.get(`${apiConstants.API}${category}/posts`);
};

export const getPost = (postId) => {
  return axios.get(`${apiConstants.API}posts/${postId}`);
};

export const newPost = (id, timestamp, title, body, author, category) => {
  const params = { id, timestamp, title, body, author, category };
  return axios.post(`${apiConstants.API}posts`, params);
};

export const getCategories = () => {
  return axios.get(`${apiConstants.API}categories`);
};

export const editPost = (id, title, body) => {
  const params = { title, body };
  return axios.put(`${apiConstants.API}posts/${id}`,params);
};

export const deletePost = (id) => {
  return axios.delete(`${apiConstants.API}posts/${id}`);
};

export const votePost = (id, upVote) => {
  const params = { option: upVote ? 'upVote' : 'downVote' };
  return axios.post(`${apiConstants.API}posts/${id}`,params);
};
