import { postConstants } from '../constants';
import * as PostService from '../services/post.service';

export function sayHellow() {
  return (dispatch) => {
    dispatch({
      type: postConstants.SAY_HELLOW,
      payload: 'hellow'
    });
  }
}

export const getPosts = () => {
  return (dispatch) => {
    PostService.getPosts().then(
      response => {
        dispatch({
          type: postConstants.GET_POSTS,
          payload: response.data
        })
      },
      error => {
        console.log(error);
      }
    );
  };
};

export const getCategories = () => {
  return (dispatch) => {
    PostService.getCategories().then(
      response => {
        console.log(JSON.stringify(response.data.categories));
        dispatch({
          type: postConstants.GET_CATEGORIES,
          payload: response.data.categories
        })
      },
      error => {
        console.log(error);
      }
    );
  };
};