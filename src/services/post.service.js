import axios from '../utils/axios.instance';
import { apiConstants } from "../constants";

export const getPosts = () => {
  return axios.get(`${apiConstants.API}posts`);
};

export const getCategories = () => {
  return axios.get(`${apiConstants.API}categories`);
};
