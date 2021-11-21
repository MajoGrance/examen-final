import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { TimeInputComponent } from './time-input/time-input.component';
import { BooleanInputComponent } from './boolean-input/boolean-input.component';
import { KeyInputComponent } from './key-input/key-input.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { SidebarSearchInputComponent } from './sidebar-search-input/sidebar-search-input.component';
import { ReferenceInputComponent } from './reference-input/reference-input.component';
import { MultipleReferenceInputComponent } from './multiple-reference-input/multiple-reference-input.component';
import { MultiSelectInputComponent } from './multi-select-input/multi-select-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasteWindowComponent } from './reference-input/paste-window/paste-window.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ListboxModule } from 'primeng/listbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { TagModule } from 'primeng/tag';
import { OrderListModule } from 'primeng/orderlist';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateMaskDirective } from '../../directives/date-mask.directive';
import { DateInvalidIconDirective } from '../../directives/date-invalid-icon.directive';
import { FormControlDirective } from '../../directives/form-control.directive';
import { TextAreaInputComponent } from './text-area-input/text-area-input.component';

const MATERIAL_MODULES: any[] = [
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
];

const PRIME_MODULES = [
    InputTextareaModule,
    CalendarModule,
    CascadeSelectModule,
    InputTextModule,
    CheckboxModule,
    ListboxModule,
    AutoCompleteModule,
    InputNumberModule,
    MultiSelectModule,
    ChipsModule,
    OrderListModule,
    TagModule,
    TooltipModule,
    DialogModule,
    TableModule
];

const DECLARACIONES = [
    TextInputComponent,
    NumberInputComponent,
    DateInputComponent,
    TimeInputComponent,
    BooleanInputComponent,
    KeyInputComponent,
    SelectInputComponent,
    SidebarSearchInputComponent,
    ReferenceInputComponent,
    MultipleReferenceInputComponent,
    MultiSelectInputComponent,
    PasteWindowComponent,
    DateMaskDirective,
    DateInvalidIconDirective,
    FormControlDirective,
    TextAreaInputComponent
];

@NgModule({
    declarations: [
        ...DECLARACIONES
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...PRIME_MODULES,
        ...MATERIAL_MODULES
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        ...DECLARACIONES
    ]
})
export class InputsModule { }
