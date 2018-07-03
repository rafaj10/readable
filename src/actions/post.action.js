import { postConstants } from '../constants';
import * as PostService from '../services/post.service';

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

export const getPostsByCategory = (category) => {
  return (dispatch) => {
    PostService.getPostsByCategory(category).then(
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

export const newPost = (title, body, author, category, callback) => {
  const time = new Date().getTime();
  const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
  return (dispatch) => {
    PostService.newPost(guid,time,title, body, author, category).then(
      response => {
        dispatch({
          type: postConstants.GET_POSTS,
          payload: response.data
        })
        callback(true);
      },
      error => {
        console.log(error);
        callback(false);
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