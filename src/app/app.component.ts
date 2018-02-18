import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Store } from '@ngrx/store';
import { State, getSignedIn } from '../pages/auth/reducers';
import { SigninPageComponent } from '../pages/auth/containers/signin-page/signin-page.component';
import { SignoutPageComponent } from '../pages/auth/containers/signout-page/signout-page.component';
import { SignupPageComponent } from '../pages/auth/containers/signup-page/signup-page.component';
import { ComposeEmailPageComponent } from '../pages/emails/containers/compose-email-page/compose-email-page.component';
import { EmailsPageComponent } from '../pages/emails/containers/emails-page/emails-page.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninPageComponent;

  pages: Array<{ icon: string, title: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private store: Store<State>
  ) {
    this.initializeApp();

    
    platform.ready().then(() => {
      console.log("REGISTER GLOBALS");
      console.log(Object.keys(iosrtc));
      console.log("PLUGINS: " + (<any>window).iosrtc);
      window['iosrtc'].registerGlobals();
      if (navigator.platform === 'iOS') {
      }
    })

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'log-in', title: 'Sign In', component: SigninPageComponent },
      { icon: 'person', title: 'Sign Up', component: SignupPageComponent }
    ];

    this.store.select(getSignedIn)
      .subscribe((signedIn) => {
        if (signedIn) {
          this.pages = [
            { icon: 'archive', title: 'Inbox', component: EmailsPageComponent },
            { icon: 'create', title: 'Compose', component: ComposeEmailPageComponent },
            { icon: 'log-out', title: 'Sign Out', component: SignoutPageComponent },
          ];
        } else {
          this.pages = [
            { icon: 'log-in', title: 'Sign In', component: SigninPageComponent },
            { icon: 'person', title: 'Sign Up', component: SignupPageComponent }
          ];
        }
      })


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
