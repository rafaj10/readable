import { commentConstants } from '../constants';
import * as CommentService from '../services/comment.service';

export const getComments = (postId) => {
  return (dispatch) => {
    CommentService.getComments(postId).then(
      response => {
        console.log("AQUIIII COMMENTS");
        console.log(JSON.stringify(response));
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