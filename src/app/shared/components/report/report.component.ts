import { Component, HostListener, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MENU_ITEMS } from '../pages-layout/sidebar/sidebar.component';

export interface IReportColumn {
    header: string;
    field: string;
    refField?: string;
    refName?: string;
    type: 'text' | 'numeric' | 'date' | 'boolean' | 'list' | 'hidden' | 'option' | 'id';
    filterType: 'text' | 'numeric' | 'date' | 'boolean' | 'option';
    hidden?: boolean;
    labels?: string[];
}

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    @Input() formGroup!: FormGroup;
    @Input() columns: IReportColumn[] = [];
    @Input() source: any[] = [];
    @Output() run = new EventEmitter();
    /**
     * Ancho de la pantalla del dispositivo en el que corre el sistema en px.
     */
    innerWidth = window.innerWidth;
    /**
     * Icono del registro, se trae de las configuraciones de modulos.
     */
    icon: string = '';
    @HostListener('window:resize')
    onResize(): void {
        this.innerWidth = window.innerWidth;
    }

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    /**
     * Obtiene ícono del modulo en el que estamos posicionados ahora.
     * @returns string correspondiente al icono de material del módulo actual.
     */
    async getIcon(): Promise<void> {
        const url = this.router.url;
        for (const mod of MENU_ITEMS) {
            if (url.indexOf(mod.link) > -1) {
                this.icon = mod.icon;
                return;
            }
        }
        this.icon = '';
    }

    onRun(): void {
        this.run.emit();
    }

}
