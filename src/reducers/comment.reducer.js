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
    default:
      return state;
  }
};
