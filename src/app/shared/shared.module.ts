import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ComponentsModule
    ],
    exports: [
        ComponentsModule,
    ],
    providers: [
        MessageService,
        ConfirmationService
    ]
})
export class SharedModule { }
