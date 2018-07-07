import { commentConstants } from '../constants';

const INITIAL_STATE = {
  comments: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case commentConstants.GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case commentConstants.NEW_COMMENT:
      return {
        comments: action.payload
      };
    case commentConstants.VOTE_COMMENT:
      return {
        comments: action.payload
      };
    case commentConstants.EDIT_COMMENT:
      return {
        comments: action.payload
      };
    case commentConstants.DELETE_COMMENT:
     return {
        comments: action.payload
      };
    default:
      return state;
  }
};
