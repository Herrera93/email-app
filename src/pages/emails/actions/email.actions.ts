import { Action } from '@ngrx/store';
import { Email } from '../models/email.model';

export enum EmailActionTypes {
  Search = '[Email] Search',
  SearchComplete = '[Email] Search Complete',
  SearchError = '[Email] Search Error',
  Load = '[Email] Load',
  Select = '[Email] Select',
  SendEmail = '[Email] Send Email',
  SendEmailSuccess = '[Email] Send Email Success',
  SendEmailFail = '[Email] Send Email Fail',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class Search implements Action {
  readonly type = EmailActionTypes.Search;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = EmailActionTypes.SearchComplete;

  constructor(public payload: Email[]) {}
}

export class SearchError implements Action {
  readonly type = EmailActionTypes.SearchError;

  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = EmailActionTypes.Load;

  constructor(public payload: Email) {}
}

export class Select implements Action {
  readonly type = EmailActionTypes.Select;

  constructor(public payload: string) {}
}

/**
 * Send Email to Email Actions
 */
export class SendEmail implements Action {
  readonly type = EmailActionTypes.SendEmail;

  constructor(public payload: Email) { }
}

export class SendEmailSuccess implements Action {
  readonly type = EmailActionTypes.SendEmailSuccess;

  constructor(public payload: Email) { }
}

export class SendEmailFail implements Action {
  readonly type = EmailActionTypes.SendEmailFail;

  constructor(public payload: Email) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type EmailActions = 
  Search
  | SearchComplete
  | SearchError
  | Load
  | Select
  | SendEmail
  | SendEmailSuccess
  | SendEmailFail;