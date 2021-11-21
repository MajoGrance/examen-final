import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseModel, IBase } from './base.model';
import { IPasteColumns } from '../shared/components/inputs/reference-input/paste-window/paste-window.component';

const fb = new FormBuilder();

export interface ICliente extends IBase {
    ruc:                string;
    nombre_apellido:    string;
}

export class ClienteModel extends BaseModel implements ICliente {
    ruc!:               string;
    nombre_apellido!:   string;

    getFormGroup(): FormGroup {
        const form = fb.group({
            id: [this.id],
            ruc: [this.ruc, Validators.required],
            nombre_apellido: [this.nombre_apellido, Validators.required]
        });
        return form;
    }

    getPasteItems(): IPasteColumns[] {
        return [
            { field: 'id', header: 'ID', type: 'id' },
            { field: 'ruc', header: 'RUC', type: 'text' },
            { field: 'nombre_apellido', header: 'Nombre', type: 'text' }
        ]
    }
}