import { commentConstants } from '../constants';
import * as CommentService from '../services/comment.service';

export const getComments = (postId) => {
  return (dispatch) => {
    CommentService.getComments(postId).then(
      response => {
        dispatch({
          type: commentConstants.GET_COMMENTS,
          payload: response.data
        })
      },
      error => {
        console.log(error);
      }
    );
  };
};

export const newComment = (body, author, parentId, callback) => {
  const time = new Date().getTime();
  const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
  return (dispatch, getState) => {
    CommentService.newComment(guid,time,body,author,parentId).then(
      response => {
        const comments = getState().comment.comments.slice(0);
        comments.push(response.data);
        dispatch({
          type: commentConstants.NEW_COMMENT,
          payload: comments
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

export const voteOnComment = (id, upVote) => {
  return (dispatch, getState) => {
    CommentService.voteComment(id,upVote).then(
      response => {
        const comments = getState().comment.comments.slice(0);
        const comment = comments.find(item => item.id === id);
        if(comment){ comment.voteScore = upVote ? comment.voteScore+1 : comment.voteScore-1; }
        dispatch({
          type: commentConstants.VOTE_COMMENT,
          payload: comments
        })
        alert('Thanks for voting');
      },
      error => {
        console.log(error);
      }
    );
  };
};

export const editComment = (id, body) => {
  return (dispatch, getState) => {
    const time = new Date().getTime();
    CommentService.editComment(id,body,time).then(
      response => {
        const comments = getState().comment.comments.slice(0);
        const comment = comments.find(item => item.id === id);
        if(comment){
          comment.body = body;
          comment.timestamp = time;
        }
        dispatch({
          type: commentConstants.EDIT_COMMENT,
          payload: comments
        })
        alert('Your comment has been successfully edited');
      },
      error => {
        console.log(error);
      }
    );
  };
};

export const deleteComment = (id) => {
  return (dispatch, getState) => {
    CommentService.deleteComment(id).then(
      response => {

        const comments = getState().comment.comments.slice(0);
        const comment = comments.find(item => item.id === id);
        const currentItemIndex = comments.indexOf(comment);
        comments.splice(currentItemIndex,1);

        dispatch({
          type: commentConstants.DELETE_COMMENT,
          payload: comments
        })
        alert('Your comment has been successfully deleted');
      },
      error => {
        console.log(error);
      }
    );
  };
};