import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../models/user.model';
import * as fromAuth from '../../reducers';
import * as Auth from '../../actions/auth.actions';
import { NavController } from 'ionic-angular';
import { EmailsPageComponent } from '../../../emails/containers/emails-page/emails-page.component';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
})
export class SigninPageComponent implements OnInit {
  pending$ = this.store.select(fromAuth.getSigninPagePending);
  error$ = this.store.select(fromAuth.getSigninPageError);

  constructor(
    private store: Store<fromAuth.State>,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.store.select(fromAuth.getSignedIn)
      .subscribe((signedIn) => {
        if (signedIn) {
          this.navCtrl.setRoot(EmailsPageComponent);
        }
      })
  }

  onSubmit($event: Authenticate) {
    this.store.dispatch(new Auth.Signin($event));
  }
}
