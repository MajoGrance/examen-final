import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IProducto } from '../../models/producto.model';

@Injectable({
    providedIn: 'root'
})
export class ProductoService extends BaseService {
    url = 'productos';

    async check(newObj: IProducto): Promise<true | string> {
        const resp = await this.getAll();
        if (resp.ok) {
            const record =  resp.resp.find((obj: IProducto): boolean => {
                if (obj.codigo === newObj.codigo && obj.id !== newObj.id) {
                    return true;
                }
                return false;
            });
            if (record) {
                return `El código ya fue registrado. Producto: ${record.nombre}`;
            }
            return true;
        }
        return 'Ha ocurrido un error insesperado';
    }
}
