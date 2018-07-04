import { combineReducers } from 'redux';
import post from './post.reducer';
import comment from './comment.reducer';

const rootReducer = combineReducers({
  post,
  comment
});

export default rootReducer;