import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserSignUp } from '../../models/user.model';
import * as fromAuth from '../../reducers';
import * as Auth from '../../actions/auth.actions';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styles: [`
    .signupContainer {
        height: 100%;
        width: 100%;
    }
  `],
})
export class SignupPageComponent implements OnInit {
  pending$ = this.store.select(fromAuth.getSignupPagePending);
  error$ = this.store.select(fromAuth.getSignupPageError);

  constructor(private store: Store<fromAuth.State>) { }

  ngOnInit() {}

  onSubmit($event: UserSignUp) {
    this.store.dispatch(new Auth.Signup($event));
  }
}
