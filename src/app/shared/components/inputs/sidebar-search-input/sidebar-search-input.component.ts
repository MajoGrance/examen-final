import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FilterService } from 'primeng/api';
import { IPagesMenu } from '../../../interfaces';
import { Subscription } from 'rxjs';

export interface SidebarMenuFilter {
    icon: string;
    label: string;
    link: string;
    items?: IPagesMenu[];
}

@Component({
    selector: 'app-sidebar-search-input',
    templateUrl: './sidebar-search-input.component.html',
    styleUrls: ['./sidebar-search-input.component.scss']
})
export class SidebarSearchInputComponent implements OnInit, OnChanges {
    /**
     * Abstract control del campo.
     */
    @Input() control!: AbstractControl;
    /**
     * Texto a mostrarse en el input cuando se encuentra vacío.
     */
    @Input() placeholder = 'Escriba aqui...';
    /**
     * Icono de la izquierda del input.
     */
    @Input() leftIcon!: string;
    /**
     * Icono de la derecha del input.
     */
    @Input() rightIcon!: string;
     /**
     * Indicador de solo lectura.
     */
    @Input() readonly!: boolean;
    /**
     * Mensaje a mostrar al colocar el puntero sobre el icono derecho.
     */
    @Input() rightIconTooltip!: string;
    /**
     * Etiqueta solo texto a mostrarse como nombre del input.
     */
    @Input() label = '';
    /**
     * Menú agrupado para búsqueda.
     */
    @Input() groupedMenu: IPagesMenu[] = [];
    /**
     * Evento de click en el icono derecho.
     */
    @Output() rightIconClick = new EventEmitter();
    /**
     * Evento de cambio del valor del campo.
     */
    @Output() changeValue = new EventEmitter();
    /**
     * Evento de seleccion del valor del campo.
     */
    @Output() selectOption = new EventEmitter();
    /**
     * Valor del campo.
     */
    model = '';
    /**
     * Menú agrupado para búsqueda filtrado.
     */
    filteredGroups: any[] = [];
    /**
     * Subscripción a los cambios del controlador.
     */
    controlSub!: Subscription;
    /**
     * Configuración de textos de errores.
     */
    errors = {
        required: 'Este campo es requerido',
    };

    constructor(
        private filterService: FilterService,
    ) { }

    ngOnInit(): void {
        this.controlSub = this.control.valueChanges.subscribe({
            next: value => {
                this.model = value;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.control) {
            if (this.controlSub) {
                try { this.controlSub.unsubscribe() } catch { }
            }
            this.controlSub = this.control.valueChanges.subscribe({
                next: value => {
                    this.model = value;
                }
            });
        }
    }

    /**
     * Acción a ejecutarse cada que se edita el campo.
     * @param value nuevo valor a asignarse al control del formulario.
     */
    change(value: any): void {
        this.control.setValue(value);
        this.changeValue.emit(value);
    }

    /**
     * Acción a ejecutarse cada que se da click en el icono de la derecha del campo.
     */
    toggleRightIcon(): void {
        this.rightIconClick.emit();
    }

    /**
     * Filtra el menu segun el texto ingresado por el usuario.
     * @param event evento del input al escribir.
     */
    filterGroupedOption(event: any): void {
        const query = event.query;
        const filteredGroups: SidebarMenuFilter[] = [];
        for (const optgroup of this.groupedMenu) {
            let valores = optgroup.children;
            if (!valores) {
                valores = [];
            }
            const filteredSubOptions = this.filterService.filter(valores, ['label'], query, 'contains');
            if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push({
                    label: optgroup.label,
                    icon: optgroup.icon,
                    link: optgroup.link,
                    items: filteredSubOptions
                });
            }
        }
        this.filteredGroups = filteredGroups;
    }

    /**
     * Selecciona un menu
     */
    onSelect(event: any): void {
        this.selectOption.emit(event);
    }
}
