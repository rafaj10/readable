import { postConstants } from '../constants';
import _ from 'lodash';
import * as PostService from '../services/post.service';

export const getPosts = () => {
  return (dispatch) => {
    PostService.getPosts().then(
      response => {
        dispatch({
          type: postConstants.UPDATE_POSTS_LIST,
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
      type: postConstants.UPDATE_POSTS_LIST,
      payload: posts
    }
  );
};

export const clearSelectedPost = () => (dispatch, getState) =>  {
  dispatch(
    {
      type: postConstants.UPDATE_POST,
      payload: undefined
    }
  );
};

export const orderPostsByVote = (topVoted) => (dispatch, getState) =>  {
  var posts = _.sortBy(getState().post.posts.slice(0), 'voteScore');
  if(topVoted){ posts.reverse(); }

  dispatch(
    {
      type: postConstants.UPDATE_POSTS_LIST,
      payload: posts
    }
  );
};

export const getPost = (postId, callback) => {
  return (dispatch) => {
    PostService.getPost(postId).then(
      response => {
        if(response.data.deleted === false){
          dispatch({
            type: postConstants.UPDATE_POST,
            payload: response.data
          })
          callback(true);
        }else{
          callback(false);
        }
      },
      error => {
        callback(false);
      }
    );
  };
};

export const getPostsByCategory = (category) => {
  return (dispatch) => {
    PostService.getPostsByCategory(category).then(
      response => {
        dispatch({
          type: postConstants.UPDATE_POSTS_LIST,
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

export const voteOnPost = (id, upVote, callback) => {
  return (dispatch, getState) => {
    PostService.votePost(id,upVote).then(
      response => {
        const selectedPost = Object.assign({}, getState().post.selectedPost);
        if(getState().post.selectedPost === undefined){
          const posts = getState().post.posts.slice(0);
          const post = posts.find(item => item.id === id);
          if(post){ post.voteScore = upVote ? post.voteScore+1 : post.voteScore-1; }
          dispatch({
            type: postConstants.UPDATE_POSTS_LIST,
            payload: posts
          })
        }else{
          selectedPost.voteScore = upVote ? selectedPost.voteScore+1 : selectedPost.voteScore-1;
          dispatch({
            type: postConstants.UPDATE_POST,
            payload: selectedPost
          })
        }
        callback(true);
        alert('Thanks for voting');
      },
      error => {
        callback(false);
        console.log(error);
      }
    );
  };
};

export const editPost = (id, title, body, callback) => {
  return (dispatch, getState) => {
    PostService.editPost(id,title,body).then(
      response => {
        const posts = getState().post.posts.slice(0);
        const post = posts.find(item => item.id === id);
        if(post){
          post.title = title;
          post.body = body;
        }
        dispatch({
          type: postConstants.UPDATE_POSTS_LIST,
          payload: posts
        })
        callback(true);
        alert('Your post has been successfully edited');
      },
      error => {
        callback(false);
        console.log(error);
      }
    );
  };
};


export const deletePost = (id, callback) => {
  return (dispatch, getState) => {
    PostService.deletePost(id).then(
      response => {
        const posts = getState().post.posts.slice(0);;
        const post = posts.find(item => item.id === id);
        const currentItemIndex = posts.indexOf(post);
        posts.splice(currentItemIndex,1);

        dispatch({
          type: postConstants.UPDATE_POSTS_LIST,
          payload: posts
        })
        callback(true);
        alert('Your comment has been deleted');
      },
      error => {
        console.log(error);
        callback(false);
      }
    );
  };
};