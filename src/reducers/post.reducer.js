import { postConstants } from '../constants';

const INITIAL_STATE = {
  categories: [],
  posts: []
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
    default:
      return state;
  }
};
