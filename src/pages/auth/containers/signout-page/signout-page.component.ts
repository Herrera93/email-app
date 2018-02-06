import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import * as Auth from '../../actions/auth.actions';
import { NavController } from 'ionic-angular';
import { SigninPageComponent } from '../signin-page/signin-page.component';

@Component({
  selector: 'app-signout-page',
  templateUrl: './signout-page.component.html',
})
export class SignoutPageComponent implements OnInit {

  constructor(
    private store: Store<fromAuth.State>,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.store.dispatch(new Auth.Signout());
    this.store.select(fromAuth.getSignedIn)
      .subscribe((signedIn) => {
        if (!signedIn) {
          this.navCtrl.setRoot(SigninPageComponent);
        }
      })
  }
}
