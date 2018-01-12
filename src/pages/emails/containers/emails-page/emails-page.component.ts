import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromEmails from '../../reducers';
import * as fromAuth from '../../../auth/reducers'
import * as collection from '../../actions/collection.actions';
import { Email } from '../../models/email.model';
import { NavController } from 'ionic-angular';
import { EmailDetailPageComponent } from '../email-detail-page/email-detail-page.component';

@Component({
    selector: 'app-emails-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'emails-page.component.html',
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
    `]
})
export class EmailsPageComponent implements OnInit {
    emails$: Observable<Email[]>;

    constructor(private store: Store<fromEmails.State>,
                private navCtrl: NavController) {
        this.emails$ = store.select(fromEmails.getEmailCollection);
    }

    ngOnInit() {
        let user = this.store.select(fromAuth.getUser);
        user.subscribe((u) => {
            if (u !== null) {
                this.store.dispatch(new collection.Load({email: u.email}));
            }
        })
    }

    onSelect($event) {
        this.navCtrl.push(EmailDetailPageComponent, {email: $event});
    }
}
