import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface OptionsInterface {
    valor: any;
    nombre: string;
    children?: any[];
}
@Component({
    selector: 'app-select-input',
    templateUrl: './select-input.component.html',
    styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent implements OnInit, OnChanges {
    /**
     * Abstract control del campo.
     */
    @Input() control!: AbstractControl;
    /**
     * Texto a mostrarse en el input cuando se encuentra vacío.
     */
    @Input() placeholder = 'Seleccionar';
    /**
     * Indicador de solo lectura.
     */
    @Input() readonly!: boolean;
    /**
     * Indicador de que no se debe tener espacios en la parte baja del input.
     */
    @Input() noPadding!: boolean;
    /**
     * Lista de opciones para selección.
     */
    @Input() options: OptionsInterface[] = [];
    /**
     * Opciones agrupadas.
     */
    @Input() optionGroupChildren: string[] = [];
    /**
     * Etiqueta solo texto a mostrarse como nombre del input.
     */
    @Input() label = '';
    /**
     * Evento de cambio del valor del campo.
     */
    @Output() changeValue = new EventEmitter();
     /**
     * Valor del campo.
     */
    model!: any;
    /**
     * Configuración de textos de errores.
     */
    errors = {
        required: 'Este campo es requerido',
    };

    constructor() { }

    ngOnInit(): void {
        this.control.setValue(this.control?.value);
        this.model = this.control?.value;
        this.control.valueChanges.subscribe({
            next: () => {
                this.model = this.control?.value;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.control) {
            this.control.setValue(this.control?.value);
            this.model = this.control?.value;
            this.control.valueChanges.subscribe({
                next: () => {
                    this.model = this.control?.value;
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
}
