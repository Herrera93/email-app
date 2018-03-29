import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { QuillModule } from 'ngx-quill';

import { ComponentsModule } from './components';
import { EmailEffects } from './effects/email.effects';
import { CollectionEffects } from './effects/collection.effects';
import { StorageEffects } from './effects/storage.effects';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';

import {ComposeEmailPageComponent} from './containers/compose-email-page/compose-email-page.component';
import {EmailsPageComponent} from './containers/emails-page/emails-page.component';
import {EmailDetailPageComponent} from './containers/email-detail-page/email-detail-page.component';

import { reducers } from './reducers';
import { EmailsService } from './services/emails.service';
import { StorageService } from './services/storage.service';

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        IonicModule.forRoot(EmailsPageComponent),

        /**
         * StoreModule.forFeature is used for composing state
         * from feature modules. These modules can be loaded
         * eagerly or lazily and will be dynamically added to
         * the existing state.
         */
        StoreModule.forFeature('emails', reducers),

        /**
         * Effects.forFeature is used to register effects
         * from feature modules. Effects can be loaded
         * eagerly or lazily and will be started immediately.
         *
         * All Effects will only be instantiated once regardless of
         * whether they are registered once or multiple times.
         */
        EffectsModule.forFeature([CollectionEffects, StorageEffects, EmailEffects]),
        QuillModule
    ],
    declarations: [
        EmailsPageComponent,
        EmailDetailPageComponent,
        ComposeEmailPageComponent
    ],
    providers: [
        EmailsService,
        StorageService,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ],
    entryComponents: [
        EmailsPageComponent,
        EmailDetailPageComponent,
        ComposeEmailPageComponent
    ]
})
export class EmailsModule { }
