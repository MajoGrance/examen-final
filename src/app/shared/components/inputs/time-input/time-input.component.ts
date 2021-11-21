import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-time-input',
    templateUrl: './time-input.component.html',
    styleUrls: ['./time-input.component.scss'],
})
export class TimeInputComponent implements OnInit {
    /**
     * Abstract control del campo.
     */
    @Input() control!: AbstractControl;
    /**
     * Texto a mostrarse en el input cuando se encuentra vacío.
     */
    @Input() placeholder = 'hh:mm:ss';
    /**
     * Icono de la izquierda del input.
     */
    @Input() leftIcon!: string;
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
    model!: string | null;
    /**
     * Configuración de textos de errores.
     */
    errors = {
        required: 'Este campo es requerido',
        pattern: 'Valor inválido',
    };

    constructor() { }

    ngOnInit(): void {
        if (this.control?.value) {
            this.model = this.control.value;
        } else {
            this.model = null
        }
        this.control.valueChanges.subscribe({
            next: () => {
                if (this.control.value) {
                    this.model = this.control.value;
                }
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.control) {
            if (this.control?.value) {
                this.model = this.control.value;
            } else {
                this.model = null;
            }
            this.control.valueChanges.subscribe({
                next: () => {
                    if (this.control.value) {
                        this.model = this.control.value;
                    }
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
