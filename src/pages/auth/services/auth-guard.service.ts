import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Auth from '../actions/auth.actions';
import * as fromAuth from '../reducers';

@Injectable()
export class AuthGuard{
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(): Observable<boolean> {
    return this.store
      .select(fromAuth.getSignedIn)
      .map(authed => {
        if (!authed) {
          this.store.dispatch(new Auth.SigninRedirect());
          return false;
        }

        return true;
      })
      .take(1);
  }
}