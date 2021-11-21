import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { OptionsInterface } from '../select-input/select-input.component';

@Component({
  selector: 'app-multiple-reference-input',
  templateUrl: './multiple-reference-input.component.html',
  styleUrls: ['./multiple-reference-input.component.scss']
})
export class MultipleReferenceInputComponent implements OnInit {
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
     * Lista de opciones para selección.
     */
    @Input() options: any[] = [];
    /**
     * Opciones agrupadas.
     */
    @Input() optionGroupChildren: string[] = [];
    /**
     * Etiqueta solo texto a mostrarse como nombre del input.
     */
    @Input() label = '';
    /**
     * Nombre del campo de etiqueta a mostrarse.
     */
    @Input() optionLabel = 'nombre';
    /**
     * Nombre del campo de valor.
     */
    @Input() optionValue = 'id';
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

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.control) {
            this.model = this.control?.value?.split(',').map((value: string): number => {
                return Number(value)
            });
        }
    }

    markAllAsTouched(): void {
        this.control.markAllAsTouched();
    }

    /**
     * Acción a ejecutarse cada que se edita el campo.
     * @param value nuevo valor a asignarse al control del formulario.
     */
    change(value: any): void {
        this.control.setValue(value.join(','));
    }

    /**
     * Obtiene el nombre de una opción dada.
     * @param value nuevo valor a asignarse al control del formulario.
     */
    getSelectedName(id: number): string {
        let label = '';
        const option = this.options.find(obj => obj.id === id);
        if (option) {
            label = option[this.optionLabel];
        }
        return label;
    }
}
