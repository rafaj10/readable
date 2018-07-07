import { postConstants } from '../constants';

const INITIAL_STATE = {
  categories: [],
  posts: [],
  selectedPost: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postConstants.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case postConstants.GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case postConstants.GET_POST:
      return {
        ...state,
        selectedPost: action.payload
      };
    case postConstants.VOTE_POST:
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
};
