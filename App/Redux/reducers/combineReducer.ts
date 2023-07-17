import { combineReducers } from 'redux';
import { authenticationReducer } from './loginReducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;