import { Action } from '@ngrx/store';
import { Email } from '../models/email.model';

export enum CollectionActionTypes {
    RemoveEmail = '[Collection] Remove Email',
    RemoveEmailSuccess = '[Collection] Remove Email Success',
    RemoveEmailFail = '[Collection] Remove Email Fail',
    Load = '[Collection] Load',
    LoadSuccess = '[Collection] Load Success',
    LoadFail = '[Collection] Load Fail',
}

/**
 * Remove Email from Collection Actions
 */
export class RemoveEmail implements Action {
    readonly type = CollectionActionTypes.RemoveEmail;

    constructor(public payload: Email) { }
}

export class RemoveEmailSuccess implements Action {
    readonly type = CollectionActionTypes.RemoveEmailSuccess;

    constructor(public payload: Email) { }
}

export class RemoveEmailFail implements Action {
    readonly type = CollectionActionTypes.RemoveEmailFail;

    constructor(public payload: Email) { }
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
    readonly type = CollectionActionTypes.Load;

    constructor(public payload: {email: string, skip?: number, limit?: number, lastRef?: string, firstRef?: string}) { }
}

export class LoadSuccess implements Action {
    readonly type = CollectionActionTypes.LoadSuccess;

    constructor(public payload: Email[]) { }
}

export class LoadFail implements Action {
    readonly type = CollectionActionTypes.LoadFail;

    constructor(public payload: any) { }
}

export type CollectionActions =
    | RemoveEmail
    | RemoveEmailSuccess
    | RemoveEmailFail
    | Load
    | LoadSuccess
    | LoadFail;