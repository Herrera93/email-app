import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../app/reducers';
import * as fromAuth from './auth.reducer';
import * as fromSigninPage from './signin-page.reducer';
import * as fromSignupPage from './signup-page.reducer';

export interface AuthState {
  status: fromAuth.State;
  signinPage: fromSigninPage.State;
  signupPage: fromSignupPage.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers = {
  status: fromAuth.reducer,
  signinPage: fromSigninPage.reducer,
  signupPage: fromSignupPage.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);
export const getSignedIn = createSelector(
  selectAuthStatusState,
  fromAuth.getSignedIn
);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

export const selectSigninPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.signinPage
);
export const getSigninPageError = createSelector(
  selectSigninPageState,
  fromSigninPage.getError
);
export const getSigninPagePending = createSelector(
  selectSigninPageState,
  fromSigninPage.getPending
);

export const selectSignupPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.signupPage
);
export const getSignupPageError = createSelector(
  selectSignupPageState,
  fromSignupPage.getError
);
export const getSignupPagePending = createSelector(
  selectSignupPageState,
  fromSignupPage.getPending
);
