import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IVenta } from '../../models/venta.model';

@Injectable({
    providedIn: 'root'
})
export class VentaService extends BaseService {
    url = 'ventas';

    async check(newObj: IVenta): Promise<true | string> {
        const resp = await this.getAll();
        if (resp.ok) {
            const record =  resp.resp.find((obj: IVenta): boolean => {
                if (obj.numero_factura === newObj.numero_factura && obj.id !== newObj.id) {
                    return true;
                }
                return false;
            });
            if (record) {
                return `La factura ya fue registrada. Venta: ${record.id}`;
            }
            if (!newObj.detalle.length) {
                return 'Debe agregar al menos un detalle';
            }
            return true;
        }
        return 'Ha ocurrido un error insesperado';
    }
}
