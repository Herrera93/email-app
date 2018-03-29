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
import { NavController } from 'ionic-angular';
import { EmailsPageComponent } from '../../emails/containers/emails-page/emails-page.component';

import { Email } from '../models/email.model';
import { EmailsService } from '../services/emails.service';
import {
    SendEmail,
    SendEmailFail,
    SendEmailSuccess,
    EmailActionTypes
} from './../actions/email.actions';

@Injectable()
export class EmailEffects {

    constructor(
        private actions$: Actions, 
        private emailService: EmailsService,
        private navCtrl: NavController
    ) { }

    @Effect()
    SendEmailToEmail$: Observable<Action> = this.actions$
        .ofType(EmailActionTypes.SendEmail)
        .map((action: SendEmail) => action.payload)
        .mergeMap(email => this.emailService.sendEmail(email))
        .mergeMap(email => email.get())
        .map(email => new SendEmailSuccess(<Email>email.data()))
        .catch(error => of(new SendEmailFail(error)));

        @Effect({ dispatch: false })
        sendEmailSuccess$ = this.actions$
            .ofType(EmailActionTypes.SendEmailSuccess)
            .do(() => this.navCtrl.setRoot(EmailsPageComponent));

}
