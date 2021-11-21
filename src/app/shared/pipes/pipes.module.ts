import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringDatePipe } from './string-date.pipe';

@NgModule({
    declarations: [
        StringDatePipe,
    ],
        imports: [
        CommonModule
    ],
    exports: [
        StringDatePipe,
    ]
})
export class PipesModule { }
