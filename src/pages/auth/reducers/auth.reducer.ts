import * as auth from '../actions/auth.actions';
import { User } from '../models/user.model';

export interface State {
  signedIn: boolean;
  user: User | null;
}

export const initialState: State = {
  signedIn: false,
  user: null,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.SIGNIN_SUCCESS: {
      return {
        ...state,
        signedIn: true,
        user: action.payload.user,
      };
    }

    case auth.SIGNOUT: {
      return {
        ...state,
        signedIn: false,
        user: null
      };
    }

    default: {
      return state;
    }
  }
}

export const getSignedIn = (state: State) => state.signedIn;
export const getUser = (state: State) => state.user;
