import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';
import { HeaderComponent } from './pages-layout/header/header.component';
import { SidebarComponent } from './pages-layout/sidebar/sidebar.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { TagModule } from 'primeng/tag';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CRUDComponent } from './crud/crud.component';
import { InputsModule } from './inputs/inputs.module';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { MessagesModule } from 'primeng/messages';
import { DividerModule } from 'primeng/divider';
import { PipesModule } from '../pipes/pipes.module';
import { ReportComponent } from './report/report.component';
import { WindowComponent } from './window/window.component';
import { DetailTableComponent } from './detail-table/detail-table.component';

const DECLARACIONES = [
    PagesLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    CRUDComponent,
    ReportComponent,
    WindowComponent,
    DetailTableComponent
];

const MATERIAL = [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
]

const PRIMENG = [
    MenuModule,
    ProgressBarModule,
    MessageModule,
    ToastModule,
    ConfirmDialogModule,
    CardModule,
    TableModule,
    TagModule,
    SpeedDialModule,
    InputTextModule,
    FieldsetModule,
    TabViewModule,
    DialogModule,
    DividerModule,
    MessagesModule
]

@NgModule({
    declarations: [
        ...DECLARACIONES
    ],
    imports: [
        CommonModule,
        PipesModule,
        InputsModule,
        ...MATERIAL,
        ...PRIMENG
    ],
    exports: [
        InputsModule,
        PipesModule,
        ...DECLARACIONES,
        ...MATERIAL,
        ...PRIMENG
    ]
})
export class ComponentsModule { }
