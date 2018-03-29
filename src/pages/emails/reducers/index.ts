import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromEmails from './email.reducer';
import * as fromCollection from './collection.reducer';
import * as fromStorage from './storage.reducer';
import * as fromRoot from '../../../app/reducers';

export interface EmailsState {
  search: fromSearch.State;
  emails: fromEmails.State;
  collection: fromCollection.State;
  storage: fromStorage.State;
}

export interface State extends fromRoot.State {
  emails: EmailsState;
}

export const reducers = {
  search: fromSearch.reducer,
  emails: fromEmails.reducer,
  collection: fromCollection.reducer,
  storage: fromStorage.reducer
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `emails` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.emailsState$ = state$.select(getEmailsState);
 * 	}
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getEmailsState = createFeatureSelector<EmailsState>('emails');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getEmailEntitiesState = createSelector(
  getEmailsState,
  state => state.emails
);

export const getSelectedEmailId = createSelector(
  getEmailEntitiesState,
  fromEmails.getSelectedId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reducers boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getEmailIds,
  selectEntities: getEmailEntities,
  selectAll: getAllEmails,
  selectTotal: getTotalEmails,
} = fromEmails.adapter.getSelectors(getEmailEntitiesState);

export const getSelectedEmail = createSelector(
  getEmailEntities,
  getSelectedEmailId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Just like with the emails selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const getSearchState = createSelector(
  getEmailsState,
  (state: EmailsState) => state.search
);

export const getSearchEmailIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of emails in the store.
 */
export const getSearchResults = createSelector(
  getEmailEntities,
  getSearchEmailIds,
  (emails, searchIds) => {
    return searchIds.map(id => emails[id]);
  }
);

export const getCollectionState = createSelector(
  getEmailsState,
  (state: EmailsState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionEmailIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getEmailCollection = createSelector(
  getEmailEntities,
  getCollectionEmailIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedEmailInCollection = createSelector(
  getCollectionEmailIds,
  getSelectedEmailId,
  (ids, selected) => {
    return ids.indexOf(selected) > -1;
  }
);

export const getStorageState = createSelector(
  getEmailsState,
  (state: EmailsState) => state.storage
);

export const getStorageLoading = createSelector(
  getStorageState,
  fromStorage.getLoading
);

export const getStorageFileURL = createSelector(
  getStorageState,
  fromStorage.getFileURL
);

export const getStorageFileMetadata = createSelector(
  getStorageState,
  fromStorage.getFileMetadata
);