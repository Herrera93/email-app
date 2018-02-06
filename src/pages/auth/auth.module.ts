import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SigninPageComponent } from './containers/signin-page/signin-page.component';
import { SignoutPageComponent } from './containers/signout-page/signout-page.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { SignupPageComponent } from './containers/signup-page/signup-page.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

import { IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';

export const COMPONENTS = [
    SigninPageComponent,
    SigninFormComponent,
    SignoutPageComponent,
    SignupPageComponent,
    SignupFormComponent
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule.forRoot(SigninPageComponent),
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: [
        SigninPageComponent,
        SignupPageComponent,
        SignoutPageComponent
    ]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootAuthModule,
            providers: [
                AuthService,
                AuthGuard,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ],
        };
    }
}

@NgModule({
    imports: [
        AuthModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([AuthEffects]),
    ],
})
export class RootAuthModule { }
