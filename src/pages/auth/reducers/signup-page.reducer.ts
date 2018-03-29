import * as auth from '../actions/auth.actions';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.SIGNUP: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case auth.SIGNUP_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case auth.SIGNUP_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
