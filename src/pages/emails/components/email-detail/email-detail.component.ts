import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import { Email } from '../../models/email.model';

import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

// override p with div tag
import Quill from 'quill';
import Delta from 'quill-delta';
import { ToolbarRTC, RTCBlot } from 'quill-rtc';

const Parchment = Quill.import('parchment');
const Block = Parchment.query('block');

Block.tagName = 'DIV';
// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
Quill.register(Block /* or NewBlock */, true);

// Add fonts to whitelist
const Font = Quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['mirza', 'aref'];
Quill.register(Font, true);

Quill.register('formats/bolt', RTCBlot);
Quill.register('modules/toolbar_rtc', ToolbarRTC);

@Component({
    selector: 'app-email-detail',
    templateUrl: 'email-detail.component.html'
})
export class EmailDetailComponent implements OnInit, OnChanges{
    @Input() email: Email;

    @ViewChild(QuillEditorComponent) editor: QuillEditorComponent;
    e: any;

    get subject() {
        return this.email.subject;
    }

    get message() {
        return this.email.message;
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

    get fromEmail() {
        return this.email.from.email;
    }

    ngOnInit() {
        this.editor.onEditorCreated.subscribe(e => {
            e.setContents(new Delta(this.message));
            this.e = e;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if(this.e){
            let email: SimpleChange = changes.email;
            this.e.setContents(new Delta(email.currentValue.message));
        }
    }
}
