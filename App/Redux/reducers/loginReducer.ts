// reducer.ts

import { LOGIN_ACTION, LOGOUT_ACTION, AuthenticationActionTypes } from '../actions/loginAction';

export interface AuthenticationState {
  isLoggedIn: boolean;
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
};

export const authenticationReducer = (
  state = initialState,
  action: AuthenticationActionTypes
): AuthenticationState => {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT_ACTION:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
