import { Action } from '@ngrx/store';

export enum StorageActionTypes {
    UploadFile = '[Storage] Upload File',
    UploadFileFail = '[Storage] Upload File Fail',
    UploadFileSuccess = '[Storage] Upload File Success',
    LoadMetadata = '[Storage] Load Metadata',
    LoadMetadataSuccess = '[Storage] Load Metadata Success',
    LoadMetadataFail = '[Storage] Load Metadata Fail'
}

/**
 * Upload File to Storage Actions
 */
export class UploadFile implements Action {
    readonly type = StorageActionTypes.UploadFile;

    constructor(public payload: File) { }
}

export class UploadFileSuccess implements Action {
    readonly type = StorageActionTypes.UploadFileSuccess;

    constructor(public payload: string) { }
}

export class UploadFileFail implements Action {
    readonly type = StorageActionTypes.UploadFileFail;

    constructor(public payload: any) { }
}

export class LoadMetadata implements Action {
    readonly type = StorageActionTypes.LoadMetadata;

    constructor(public payload: string) { }
}

export class LoadMetadataSuccess implements Action {
    readonly type = StorageActionTypes.LoadMetadataSuccess;

    constructor(public payload: any) { }
}

export class LoadMetadataFail implements Action {
    readonly type = StorageActionTypes.LoadMetadataFail;

    constructor(public payload: any) { }
}


export type StorageActions =
    UploadFile
    | UploadFileSuccess
    | UploadFileFail
    | LoadMetadata
    | LoadMetadataSuccess
    | LoadMetadataFail;