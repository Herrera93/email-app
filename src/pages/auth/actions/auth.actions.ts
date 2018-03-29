import { Action } from '@ngrx/store';
import { User, Authenticate, UserSignUp } from '../models/user.model';

export const SIGNIN = '[Auth] Signin';
export const SIGNUP = '[Auth] Signup';
export const SIGNOUT = '[Auth] Signout';
export const SIGNOUT_SUCCESS = '[Auth] Signout Success';
export const SIGNOUT_FAILURE = '[Auth] Signout Failure';
export const SIGNIN_SUCCESS = '[Auth] Signin Success';
export const SIGNIN_FAILURE = '[Auth] Signin Failure';
export const SIGNIN_REDIRECT = '[Auth] Signin Redirect';
export const SIGNUP_SUCCESS = '[Auth] Signup Success';
export const SIGNUP_FAILURE = '[Auth] Signup Failure';

export class Signin implements Action {
  readonly type = SIGNIN;

  constructor(public payload: Authenticate) {}
}

export class SigninSuccess implements Action {
  readonly type = SIGNIN_SUCCESS;

  constructor(public payload: { user: User }) { }
}

export class SigninFailure implements Action {
  readonly type = SIGNIN_FAILURE;

  constructor(public payload: any) {}
}

export class SigninRedirect implements Action {
  readonly type = SIGNIN_REDIRECT;
}

export class Signup implements Action {
  readonly type = SIGNUP;

  constructor(public payload: UserSignUp) {}
}

export class SignupSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;

  constructor(public payload: any) {}
}

export class SignupFailure implements Action {
  readonly type = SIGNUP_FAILURE;

  constructor(public payload: any) {}
}


export class Signout implements Action {
  readonly type = SIGNOUT;
}

export class SignoutSuccess implements Action {
  readonly type = SIGNOUT_SUCCESS;
}

export class SignoutFailure implements Action {
  readonly type = SIGNOUT_FAILURE;

  constructor(public payload: string) { }
}

export type Actions =
  | Signin
  | SigninSuccess
  | SigninFailure
  | SigninRedirect
  | Signup
  | SignupSuccess
  | SignupFailure
  | Signout
  | SignoutFailure
  | SignoutSuccess;
