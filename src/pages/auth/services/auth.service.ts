import { Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import { Authenticate } from '../models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  signin({ email, password }: Authenticate) {
    return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  signout() {
    return fromPromise(this.afAuth.auth.signOut());
  }

  signup({email, password, displayName}) {
    return fromPromise<firebase.User>(this.afAuth.auth.createUserWithEmailAndPassword(email, password))
    .mergeMap(user => fromPromise(user.updateProfile({ displayName, photoURL: null })));
  }
}
