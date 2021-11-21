import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthRoutingModule } from './auth-routing.routes';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        LoginComponent,
        LogoutComponent,
        AuthComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule
    ]
})
export class AuthModule { }
