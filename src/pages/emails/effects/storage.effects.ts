import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { StorageService } from '../services/storage.service';
import {
    StorageActionTypes,
    UploadFile,
    UploadFileFail,
    UploadFileSuccess,
    LoadMetadata,
    LoadMetadataSuccess,
    LoadMetadataFail
} from './../actions/storage.actions';

@Injectable()
export class StorageEffects {

    constructor(private actions$: Actions, private storageService: StorageService) { }

    @Effect()
    uploadFile$: Observable<Action> = this.actions$
        .ofType(StorageActionTypes.UploadFile)
        .map((action: UploadFile) => action.payload)
        .mergeMap((file) => this.storageService.uploadFileToEmail(file))
        .map(result => new UploadFileSuccess(result.metadata.downloadURLs[0]))
        .catch(error => of(new UploadFileFail(error)));

    @Effect()
    loadMetadata$: Observable<Action> = this.actions$
        .ofType(StorageActionTypes.LoadMetadata)
        .map((action: LoadMetadata) => action.payload)
        .mergeMap(filePath => this.storageService.loadMetadata(filePath))
        .map(result => new LoadMetadataSuccess(result))
        .catch(error => of(new LoadMetadataFail(error)));
}
