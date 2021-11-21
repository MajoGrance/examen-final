import { Injectable } from '@angular/core';
import { IUsuario } from '../../models/usuario.model';
import { ICliente } from '../../models/cliente.model';
import { IProducto } from '../../models/producto.model';
import { IVenta } from '../../models/venta.model';
import { ServiceResponse } from '../../shared/interfaces';
import { AppStorageService } from '../utils/app-storage.service';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    url = '';

    constructor(
        private storage: AppStorageService
    ) { }

    async get(id: number): Promise<ServiceResponse> {
        const resp = await this.getAll();
        if (resp.ok) {
            const obj = resp.resp.find((objI: any) => objI.id === Number(id));
            if (obj) {
                return {
                    ok: true,
                    msg: `Objeto: ${id}`,
                    resp: obj
                }
            }
        }
        return resp;
    }

    async save(obj: IUsuario | ICliente | IProducto | IVenta): Promise<ServiceResponse> {
        return this.storage.save(this.url, obj);
    }

    async delete(id: number): Promise<ServiceResponse> {
        return this.storage.delete(this.url, id);
    }

    async getAll(): Promise<ServiceResponse> {
        return this.storage.getAll(this.url);
    }

    async check(obj: any): Promise<true | string> {
        return true;
    }
}
