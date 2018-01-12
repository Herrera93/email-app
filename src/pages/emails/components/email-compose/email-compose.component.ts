import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Email } from '../../models/email.model';

import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

// override p with div tag
import Quill from 'quill';
import { ToolbarRTC, RTCBlot } from 'quill-rtc';

const Parchment = Quill.import('parchment');
const Block = Parchment.query('block');
// const BlockEmbed = Quill.import('blots/block/embed');

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
    selector: 'app-email-compose',
    templateUrl: './email-compose.component.html'
})
export class EmailComposeComponent implements OnInit {

    @ViewChild(QuillEditorComponent) editor: QuillEditorComponent;
    @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;

    @Input()
    set pending(isPending: boolean) {
        if (isPending) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    @Input() errorMessage: string | null;

    @Output() submitted = new EventEmitter<Email>();

    form: FormGroup = new FormGroup({
        to: new FormControl(''),
        subject: new FormControl(''),
        message: new FormControl('')
    });

    modules = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean'],
                ['rtc'],
                ['link', 'image', 'video']
            ],
            handlers: { 'rtc': function () { } }
        },
        toolbar_rtc: true
    };

    unformattedMessage = '';
    private currentDelta = null;

    constructor() {
    }

    ngOnInit() {
    }

    submit() {
        if (this.form.valid) {
            const val: Email = this.form.value;
            val.date = new Date().toISOString();
            val.isDeleted = false;
            val.isImportant = false;
            val.unformattedMessage = this.unformattedMessage;
            val.message = this.currentDelta.ops;

            this.submitted.emit(val);
        }
    }

    contentChange($event) {
        this.unformattedMessage = $event.text.substring(0, $event.text.length - 1);
        this.currentDelta = $event.editor.getContents();
    }
}
