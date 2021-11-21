import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-key-input',
    templateUrl: './key-input.component.html',
    styleUrls: ['./key-input.component.scss']
})
export class KeyInputComponent implements OnInit, OnChanges {
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
     * Valor del campo, falso o verdadero.
     */
    model = '';
    /**
     * Tipo del input correspondiente a la contraseña es text cuando es visible, password cuando no.
     */
    passwordType = 'password';
    /**
     * Configuración de textos de errores.
     */
    errors = {
        required: 'Este campo es requerido',
        pattern: 'Ingrese al menos 8 caracteres, 1 número, 1 minúscula, 1 mayúscula y 1 caracter especial',
        diff: 'Las contraseñas no son iguales',
        maxLenght: 'Excede la longitud máxima', 
    };

    /**
     * Icono de visibilidad a la derecha del input.
     */
    get icon(): string {
        if (this.passwordType === 'text') {
            return 'pi pi-eye';
        }
        return 'pi pi-eye-slash'
    }

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
    }

    /**
     * Modifica la visibilidad, si es oculto (password) cambia a visible (text) y viseversa.
     */
    toggleVisibility(): void {
        if (this.passwordType === 'text') {
            this.passwordType = 'password';
        } else {
            this.passwordType = 'text';
        }
    }
}
