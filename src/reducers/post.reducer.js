import { postConstants } from '../constants';

const INITIAL_STATE = {
  hellow: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postConstants.SAY_HELLOW:
      return {
        ...state,
        hellow: action.payload
      };
    default:
      return state;

  }
};
