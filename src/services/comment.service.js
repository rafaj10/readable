import axios from '../utils/axios.instance';
import { apiConstants } from "../constants";

export const getComments = (postId) => {
  return axios.get(`${apiConstants.API}posts/${postId}/comments`);
};