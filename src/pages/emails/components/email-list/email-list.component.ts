import { Component, Input, Output, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Email } from '../../models/email.model';

@Component({
    selector: 'app-email-list',
    templateUrl: 'email-list.component.html'
})
export class EmailListComponent implements OnChanges, OnInit {
    @Input() emails: Email[];

    @Output() selectedEmail = new EventEmitter<Email>();

    page: number;
    total: number;
    to: number;
    from: number;

    selections = ['All', 'None', 'Read', 'Unread', 'Important', 'Not important',
        'Starred', 'Unstarred'];
    options = [
        {
            name: 'Delete',
            icon: 'trash'
        },
        {
            name: 'Labels',
            icon: 'bookmark'
        },
    ];

    ngOnInit() {
        this.page = 1;
    }

    onSelect(email: Email) {
        this.selectedEmail.emit(email);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.emails.isFirstChange) {
            this.total = changes.emails.currentValue.length;
            this.from = (this.page - 1) * 50 + 1;
            this.to = (this.from + 49 < this.total) ? this.from + 49 : this.total;
        }
    }

}
