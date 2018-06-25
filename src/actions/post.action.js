import { postConstants } from '../constants';

export function sayHellow() {
  return (dispatch) => {
    dispatch({
      type: postConstants.SAY_HELLOW,
      payload: 'hellow'
    });
  }
}
