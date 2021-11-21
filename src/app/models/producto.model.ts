import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseModel, IBase } from './base.model';
import { noCeroValidator } from '../shared/validators';
import { IPasteColumns } from '../shared/components/inputs/reference-input/paste-window/paste-window.component';

const fb = new FormBuilder();

export interface IProducto extends IBase {
    codigo:         string,
    nombre:         string,
    precio_venta:   number,
    existencia:     number
}

export class ProductoModel extends BaseModel implements IProducto {
    codigo!:        string;
    nombre!:        string;
    precio_venta!:  number;
    existencia!:    number;

    getFormGroup(): FormGroup {
        const form = fb.group({
            id: [this.id],
            codigo: [this.codigo, Validators.required],
            nombre: [this.nombre, Validators.required],
            precio_venta: [this.precio_venta, [Validators.required, noCeroValidator]],
            existencia: [this.existencia]
        });
        return form;
    }

    getPasteItems(): IPasteColumns[] {
        return [
            { field: 'id', header: 'ID', type: 'id' },
            { field: 'codigo', header: 'codigo', type: 'text' },
            { field: 'nombre', header: 'Nombre', type: 'text' },
            { field: 'precio_venta', header: 'Nombre', type: 'numeric' },
            { field: 'existencia', header: 'Existencia', type: 'numeric' }
        ]
    }
}