import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface OptionsMultiInterface {
    valor: any;
    nombre: string;
    readonly?: boolean;
    children?: any[];
}

@Component({
    selector: 'app-multi-select-input',
    templateUrl: './multi-select-input.component.html',
    styleUrls: ['./multi-select-input.component.scss']
})
export class MultiSelectInputComponent implements OnInit {
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
     * Indicador de solo lectura del buscador.
     */
    @Input() readonlySearch!: boolean;
    /**
     * Indicador de que no se debe tener espacios en la parte baja del input.
     */
    @Input() noPadding!: boolean;
    /**
     * Lista de opciones para selección.
     */
    @Input() options: OptionsMultiInterface[] = [];
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
    model: any[] = [];
    /**
     * Configuración de textos de errores.
     */
    errors = {
        required: 'Este campo es requerido',
    };

    constructor() { }

    ngOnInit(): void {
        if (this.control?.value) {
            this.model = this.control?.value?.split(',');
        } else {
            this.model = [];
        }
        this.control.valueChanges.subscribe({
            next: () => {
                this.model = this.control?.value?.split(',');
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.control) {
            if (this.control?.value) {
                this.model = this.control?.value?.split(',');
            } else {
                this.model = [];
            }
            if (changes.control) {
                this.model = this.control?.value?.split(',');
            }
        }
    }

    /**
     * Acción a ejecutarse cada que se edita el campo.
     * @param value nuevo valor a asignarse al control del formulario.
     */
    change(value: any): void {
        this.control.setValue(value.join(','));
        this.changeValue.emit(value.join(','));
        this.control.markAllAsTouched();
    }

}
