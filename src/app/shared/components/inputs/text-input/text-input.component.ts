import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, OnChanges {
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
     * Indicador de que no se debe tener espacios en la parte baja del input.
     */
    @Input() noPadding!: boolean;
    /**
     * Etiqueta solo texto a mostrarse como nombre del input.
     */
    @Input() label = '';
    /**
     * Mensaje a mostrar al colocar el puntero sobre el icono derecho.
     */
    @Input() rightIconTooltip!: string;
    /**
     * Evento de click en el icono derecho.
     */
    @Output() rightIconClick = new EventEmitter();
    /**
     * Evento de cambio del valor del campo.
     */
    @Output() changeValue = new EventEmitter();
    /**
     * Evento de click en el campo.
     */
    @Output() clickInput = new EventEmitter();
    /**
     * Configuración de textos de errores.
     */
    errors = {
        maxLenght: 'Excede la longitud máxima', 
        required: 'Este campo es requerido',
        pattern: 'Formato inválido',
    };
    /**
     * Valor del campo.
     */
    model!: string;

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

    /**
     * Acción a ejecutarse cada que se da click en el icono de la derecha del campo.
     */
    toggleRightIcon(): void {
        this.rightIconClick.emit();
    }

    /**
     * Acción a ejecutarse cada que se da click en el icono de la derecha del campo.
     */
    onClickInput(): void {
        this.clickInput.emit();
    }
}
