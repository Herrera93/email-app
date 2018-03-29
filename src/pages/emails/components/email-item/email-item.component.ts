import { Component, Input } from '@angular/core';
import { Email } from '../../models/email.model';

@Component({
    selector: 'app-email-item',
    templateUrl: 'email-item.component.html'
})
export class EmailItemComponent {
    @Input() email: Email;

    get id() {
        return this.email.uid;
    }

    get subject() {
        return this.email.subject;
    }

    get message() {
        return this.email.message;
    }

    get unformattedMessage() {
        return this.email.unformattedMessage;
    }

    get date() {
        return this.email.date;
    }

    get isImportant() {
        return this.email.isImportant;
    }

    get fromName() {
        return this.email.from.displayName;
    }
}
