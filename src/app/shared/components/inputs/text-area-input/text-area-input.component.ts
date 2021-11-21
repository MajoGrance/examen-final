import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-text-area-input',
    templateUrl: './text-area-input.component.html',
    styleUrls: ['./text-area-input.component.scss']
})
export class TextAreaInputComponent implements OnInit, OnChanges {
    /**
     * Abstract control del campo.
     */
    @Input() control!: AbstractControl;
    /**
     * Texto a mostrarse en el input cuando se encuentra vacío.
     */
    @Input() placeholder = 'Escriba aqui...';
    /**
     * Indicador de que no se debe tener espacios en la parte baja del input.
     */
    @Input() noPadding!: boolean;
    /**
     * Indicador de solo lectura.
     */
    @Input() readonly!: boolean;
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
    model!: Date;
    /**
     * Configuración de textos de errores.
     */
    errors = {
        required: 'Este campo es requerido',
        pattern: 'Valor inválido',
    };

    constructor() { }

    ngOnInit(): void {
        this.model = this.control?.value;
        this.control.valueChanges.subscribe({
            next: () => {
                this.model = this.control?.value;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.control) {
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
    change(): void {
        this.control.setValue(this.model);
        this.changeValue.emit(this.model);
    }
}
