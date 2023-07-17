export const LOGIN_ACTION = 'LOG_IN';
export const LOGOUT_ACTION = 'LOG_OUT';

export interface LoginAction {
  type: typeof LOGIN_ACTION;
}

export interface LogoutAction {
  type: typeof LOGOUT_ACTION;
}

export type AuthenticationActionTypes = LoginAction | LogoutAction;

export const loginAction = (): LoginAction => ({
  type: LOGIN_ACTION,
});

export const logoutAction = (): LogoutAction => ({
  type: LOGOUT_ACTION,
});