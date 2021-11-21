import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { StringDatePipe } from '../../../pipes/string-date.pipe';

@Component({
    selector: 'app-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss'],
    providers: [StringDatePipe]
})
export class DateInputComponent implements OnInit, OnChanges {
    /**
     * Abstract control del campo.
     */
    @Input() control!: AbstractControl;
    /**
     * Texto a mostrarse en el input cuando se encuentra vacío.
     */
    @Input() placeholder = 'dd/mm/aaaa';
    /**
     * Indicador de que no se debe tener espacios en la parte baja del input.
     */
    @Input() noPadding!: boolean;
    /**
     * Indicador de solo lectura.
     */
    @Input() readonly!: boolean;
    /**
     * Icono de la izquierda del input.
     */
    @Input() leftIcon!: string;
    /**
     * Incluir hora al input de fecha.
     */
    @Input() showTime!: boolean;
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
    model!: Date | null;
    /**
     * Configuración de textos de errores.
     */
    errors = {
        required: 'Este campo es requerido',
        pattern: 'Valor inválido',
        ini_fin: 'La fecha de fin debe ser mayor a la fecha de inicio',
    };

    constructor(
        private stringDate: StringDatePipe
    ) { }

    ngOnInit(): void {
        if (this.control?.value) {
            if (this.control?.value.length === 10) {
                this.model = this.stringDate.transform(this.control.value);
            } else {
                this.model = new Date(this.control?.value);
            }
        } else {
            this.model = null
        }
        this.control.valueChanges.subscribe({
            next: () => {
                if (this.control?.value) {
                    if (this.control?.value.length === 10) {
                        this.model = this.stringDate.transform(this.control.value);
                    } else {
                        this.model = new Date(this.control?.value);
                    }
                } else {
                    this.model = null
                }
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.control) {
            if (this.control?.value) {
                if (this.control?.value.length === 10) {
                    this.model = this.stringDate.transform(this.control.value);
                } else {
                    this.model = new Date(this.control?.value);
                }
            } else {
                this.model = null;
            }
            this.control.valueChanges.subscribe({
                next: () => {
                    if (this.control?.value) {
                        if (this.control?.value.length === 10) {
                            this.model = this.stringDate.transform(this.control.value);
                        } else {
                            this.model = new Date(this.control?.value);
                        }
                    } else {
                        this.model = null
                    }
                }
            });
        }
    }

    /**
     * Acción a ejecutarse cada que se edita el campo.
     * @param value nuevo valor a asignarse al control del formulario.
     */
    change(dateInput?: any): void {
        this.control.setValue(this.model);
        this.changeValue.emit(this.model);
        if (dateInput) {
            dateInput = dateInput.el.nativeElement;
            const input: HTMLInputElement = dateInput?.getElementsByTagName('input')[0];
            if (this.control.invalid && this.control.touched) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        }
    }

    onFocusOut(dateInput?: any) {
        if (dateInput) {
            dateInput = dateInput.el.nativeElement;
            const input: HTMLInputElement = dateInput?.getElementsByTagName('input')[0];
            if (this.control.invalid && this.control.touched) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        }
    }
}
