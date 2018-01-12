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

import { EmailsService } from '../services/emails.service';
import {
    Load,
    LoadFail,
    LoadSuccess,
    CollectionActionTypes
} from './../actions/collection.actions';

@Injectable()
export class CollectionEffects {

    constructor(private actions$: Actions, private emailService: EmailsService) { }

    @Effect()
    loadCollection$: Observable<Action> = this.actions$
        .ofType(CollectionActionTypes.Load)
        .map((action: Load) => action.payload)
        .mergeMap((payload) =>
            this.emailService.loadEmails(
                payload.email,
                payload.skip,
                payload.limit,
                payload.lastRef,
                payload.firstRef
            )
        )
        .map((emails) => new LoadSuccess(emails))
        .catch(error => of(new LoadFail(error)));
}
