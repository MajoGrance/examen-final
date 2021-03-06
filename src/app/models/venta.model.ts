import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBase, BaseModel } from './base.model';
import { ICliente } from './cliente.model';
import { IProducto } from './producto.model';
import { noCeroValidator } from '../shared/validators';
import { VentaService } from '../services/abm/venta.service';
import { ServiceResponse } from '../shared/interfaces';

const fb = new FormBuilder();
export interface IVenta extends IBase {
    fecha:             Date,
    numero_factura:    string,
    cliente:           ICliente,
    total:             number,
    detalle:           IVentaDetalle[]
}

export interface IVentaDetalle {
    producto:          IProducto,
    cantidad:          number,
    total:             number,
}

export class VentaModel extends BaseModel implements IVenta {
    fecha!:            Date;
    numero_factura!:   string;
    cliente!:          ICliente;
    total!:            number;
    detalle!:          IVentaDetalle[];

    constructor() {
        super();
        this.fecha = new Date;
        this.detalle = [];
    }


    getFormGroup(): FormGroup {
        const form = fb.group({
            id: [this.id],
            fecha: [this.fecha, Validators.required],
            numero_factura: [this.numero_factura, Validators.required],
            cliente_id: [this.cliente?.id],
            cliente_ruc: [this.cliente?.ruc, Validators.required],
            cliente_nombre: [this.cliente?.nombre_apellido],
            cliente: [this.cliente],
            total: [this.total],
            detalle: fb.array([])
        });
        for (const row of this.detalle) {
            const detalleForm = this.getDetalleFormGroup(row);
            (form.get('detalle') as FormArray).push(detalleForm);
        }
        return form;
    }

    getDetalleFormGroup(detalle?: IVentaDetalle): FormGroup {
        const form = fb.group({
            producto_id: [detalle?.producto?.id],
            producto_codigo: [detalle?.producto?.codigo, Validators.required],
            producto_nombre: [detalle?.producto?.nombre],
            producto: [detalle?.producto],
            cantidad: [detalle?.cantidad, [Validators.required, noCeroValidator]],
            total: [detalle?.total, Validators.required]
        });
        return form;
    }

    async delete(service: VentaService): Promise<ServiceResponse> {
        if (service && service.delete) {
            const resp = await service.delete(this.id);
            if (resp.ok) {
                this.id = resp.resp.id;
            }
            return resp;
        } else {
            return {
                ok: false,
                msg: 'Servicio con errores o no prove??do',
                resp: 'Provea el servicio para eliminar y verifique que este implemente el m??todo delete'
            };
        }
    }
}