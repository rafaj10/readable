import axios from '../utils/axios.instance';
import { apiConstants } from "../constants";

export const getComments = (postId) => {
  return axios.get(`${apiConstants.API}posts/${postId}/comments`);
};

export const newComment = (id, timestamp, body, author, parentId) => {
  const params = { id, timestamp, body, author, parentId };
  return axios.post(`${apiConstants.API}comments`,params);
};

export const editComment = (id, body, timestamp) => {
  const params = { timestamp, body };
  return axios.put(`${apiConstants.API}comments/${id}`,params);
};

export const deleteComment = (id) => {
  return axios.delete(`${apiConstants.API}comments/${id}`);
};

export const voteComment = (id, upVote) => {
  const params = { option: upVote ? 'upVote' : 'downVote' };
  return axios.post(`${apiConstants.API}comments/${id}`,params);
};