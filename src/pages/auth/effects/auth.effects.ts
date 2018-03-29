import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../services/auth.service';
import * as Auth from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

    @Effect()
    signin$ = this.actions$
        .ofType(Auth.SIGNIN)
        .map((action: Auth.Signin) => action.payload)
        .switchMap(auth => this.authService.signin(auth))
        .map(user => new Auth.SigninSuccess({
            user: {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName
            }
        }))
        .catch(error => of(new Auth.SigninFailure(error)));

    @Effect()
    signup$ = this.actions$
        .ofType(Auth.SIGNUP)
        .map((action: Auth.Signup) => action.payload)
        .switchMap(user => this.authService.signup(user))
        .map(user => new Auth.SignupSuccess({}))
        .catch(error => of(new Auth.SignupFailure(error)));

    @Effect()
    signout$ = this.actions$
        .ofType(Auth.SIGNOUT)
        .map((action: Auth.Signout) => this.authService.signout())
        .map(user => new Auth.SignoutSuccess())
        .catch(error => of(new Auth.SignoutFailure(error)));


    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) { } 
}
