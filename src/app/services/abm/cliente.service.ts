import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ICliente } from '../../models/cliente.model';

@Injectable({
    providedIn: 'root'
})
export class ClienteService extends BaseService {
    url = 'clientes';

    async check(newObj: ICliente): Promise<true | string> {
        const resp = await this.getAll();
        if (resp.ok) {
            const record =  resp.resp.find((obj: ICliente): boolean => {
                if (obj.ruc === newObj.ruc && obj.id !== newObj.id) {
                    return true;
                }
                return false;
            });
            if (record) {
                return `El ruc ya fue registrado. Cliente: ${record.nombre_apellido}`;
            }
            return true;
        }
        return 'Ha ocurrido un error insesperado';
    }
}
