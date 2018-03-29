import {
    CollectionActionTypes,
    CollectionActions,
  } from '../actions/collection.actions';
  
  export interface State {
    loaded: boolean;
    loading: boolean;
    ids: string[];
  }
  
  const initialState: State = {
    loaded: false,
    loading: false,
    ids: [],
  };
  
  export function reducer(
    state = initialState,
    action: CollectionActions
  ): State {
    switch (action.type) {
      case CollectionActionTypes.Load: {
        return {
          ...state,
          loading: true,
        };
      }
  
      case CollectionActionTypes.LoadSuccess: {
        return {
          loaded: true,
          loading: false,
          ids: action.payload.map(email => email.uid),
        };
      }
  
      default: {
        return state;
      }
    }
  }
  
  export const getLoaded = (state: State) => state.loaded;
  
  export const getLoading = (state: State) => state.loading;
  
  export const getIds = (state: State) => state.ids;