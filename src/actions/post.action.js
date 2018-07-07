import { postConstants } from '../constants';
import _ from 'lodash';
import * as PostService from '../services/post.service';

export const getPosts = () => {
  return (dispatch) => {
    PostService.getPosts().then(
      response => {
        console.log(JSON.stringify(response.data));
        dispatch({
          type: postConstants.GET_POSTS,
          payload: _.sortBy(response.data, 'timestamp').reverse()
        })
      },
      error => {
        console.log(error);
      }
    );
  };
};

export const orderPostsByDate = (recent) => (dispatch, getState) =>  {
  var posts = _.sortBy(getState().post.posts.slice(0), 'timestamp');
  if(recent){ posts.reverse(); }

  dispatch(
    {
      type: postConstants.NEW_ORDER_POSTS,
      payload: posts
    }
  );
};

export const orderPostsByVote = (topVoted) => (dispatch, getState) =>  {
  var posts = _.sortBy(getState().post.posts.slice(0), 'voteScore');
  if(topVoted){ posts.reverse(); }

  dispatch(
    {
      type: postConstants.NEW_ORDER_POSTS,
      payload: posts
    }
  );
};

export const getPost = (postId) => {
  return (dispatch) => {
    PostService.getPost(postId).then(
      response => {
        dispatch({
          type: postConstants.GET_POST,
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
          payload: _.sortBy(response.data, 'timestamp').reverse()
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

export const voteOnPost = (id, upVote) => {
  return (dispatch, getState) => {
    PostService.votePost(id,upVote).then(
      response => {
        const posts = getState().post.posts.slice(0);
        const post = posts.find(item => item.id === id);
        if(post){ post.voteScore = upVote ? post.voteScore+1 : post.voteScore-1; }
        dispatch({
          type: postConstants.VOTE_POST,
          payload: posts
        })
        alert('Your comment has been edited');
      },
      error => {
        console.log(error);
      }
    );
  };
};