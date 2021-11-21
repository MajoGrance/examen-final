import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent implements OnInit, OnChanges {
    /**
     * Abstract control del campo.
     */
    @Input() control!: AbstractControl;
    /**
     * Texto a mostrarse en el input cuando se encuentra vacío.
     */
    @Input() placeholder = '0';
    /**
     * Icono de la izquierda del input.
     */
    @Input() leftIcon!: string;
    /**
     * Icono de la derecha del input.
     */
    @Input() rightIcon!: string;
    /**
     * Indicador de que no se debe tener espacios en la parte baja del input.
     */
    @Input() noPadding!: boolean;
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
     * Número mínimo de decimales en el campo.
     */
    @Input() minFractionDigits = 1;
    /**
     * Número máximo de decimales en el campo
     */
    @Input() maxFractionDigits = 6;
    /**
     * Evento de click en el icono derecho.
     */
    @Output() rightIconClick = new EventEmitter();
    /**
     * Evento de cambio del valor del campo.
     */
    @Output() changeValue = new EventEmitter();
    /**
     * Valor del campo.
     */
    model!: number | null;
    /**
     * Configuración de textos de errores.
     */
    errors = {
        required: 'Este campo es requerido',
        pattern: 'Valor inválido',
    };

    constructor() { }

    ngOnInit(): void {
        this.control.setValue(Number(this.control?.value));
        this.model = this.control?.value;
        this.control.valueChanges.subscribe({
            next: (value) => {
                if (value !== null) {
                    this.model = Number(this.control?.value);
                } else {
                    this.model = null;
                }
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.control) {
            this.control.setValue(Number(this.control?.value));
            this.model = Number(this.control?.value);
            this.control.valueChanges.subscribe({
                next: () => {
                    this.model = this.control?.value;
                }
            });
        }
    }

    /**
     * Verifica si el valor del campo es equivalente a cero, si es vacío, nulo o undefined
     * debe ser 0.
     */
    checkCero(numberInput?: any): void {
        this.control?.markAllAsTouched();
        if (!this.control.value) {
            this.control.setValue(0);
        }
        if (numberInput) {
            numberInput = numberInput.el.nativeElement;
            const input: HTMLInputElement = numberInput?.children[0]?.children[0];
            if (this.control.invalid && this.control.touched) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        }
    }

    /**
     * Acción a ejecutarse cada que se edita el campo.
     * @param value nuevo valor a asignarse al control del formulario.
     */
    change(value: any, numberInput?: any): void {
        this.control.setValue(value);
        this.changeValue.emit(value);
        if (numberInput) {
            numberInput = numberInput.el.nativeElement;
            const input: HTMLInputElement = numberInput?.children[0]?.children[0];
            if (this.control.invalid && this.control.touched) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        }
    }

    /**
     * Acción a ejecutarse cada que se da click en el icono de la derecha del campo.
     */
    toggleRightIcon(): void {
        this.rightIconClick.emit();
    }

    /**
     * Verifica si el campo tiene valor cero, si es asi limpia el input para que el usuario escriba.
     */
    clearCero(numberInput?: any): void {
        if (Number(this.control.value) === 0) {
            setTimeout(() => {
                this.control.setValue(null);
                if (numberInput) {
                    numberInput = numberInput.el.nativeElement;
                    const input: HTMLInputElement = numberInput?.children[0]?.children[0];
                    if (this.control.invalid && this.control.touched) {
                        input.classList.add('is-invalid');
                    } else {
                        input.classList.remove('is-invalid');
                    }
                }
            })
        }
    }
}
