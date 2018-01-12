import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';
import { IonicModule } from 'ionic-angular';

import { EmailComposeComponent } from './email-compose/email-compose.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { EmailItemComponent } from './email-item/email-item.component';
import { EmailListComponent } from './email-list/email-list.component';
import { EmailSearchComponent } from './email-search/email-search.component';

export const COMPONENTS = [
    EmailComposeComponent,
    EmailDetailComponent,
    EmailItemComponent,
    EmailListComponent,
    EmailSearchComponent,
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        QuillModule,
        IonicModule
    ],
    declarations: COMPONENTS,
    providers: [
    ],
    entryComponents: [],
    exports: COMPONENTS,
})
export class ComponentsModule { }
