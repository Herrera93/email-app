import { Component } from '@angular/core';
import { Email } from '../../models/email.model';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'app-email-detail-page',
    templateUrl: 'email-detail-page.component.html'
})
export class EmailDetailPageComponent {
    email: Email;

    constructor(navParams: NavParams) {
        this.email = navParams.get('email');
    }
}
