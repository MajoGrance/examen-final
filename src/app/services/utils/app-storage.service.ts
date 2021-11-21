import { Injectable } from '@angular/core';
import { IUsuario } from '../../models/usuario.model';
import { ICliente } from '../../models/cliente.model';
import { IProducto } from '../../models/producto.model';
import { IVenta } from 'src/app/models/venta.model';
import { ServiceResponse } from '../../shared/interfaces';

const SERVICES = [
    'usuarios',
    'clientes',
    'productos',
    'ventas'
]

const ETIQUETAS: any = {
    'usuarios': 'El usuario',
    'clientes': 'El cliente',
    'productos': 'El producto',
    'ventas': 'La venta'
}

@Injectable({
    providedIn: 'root'
})
export class AppStorageService {

    constructor( ) { }

    save(endpoint: string, item: IUsuario | ICliente | IProducto | IVenta): ServiceResponse {
        let resp = this.getAll(endpoint);
        if (resp.ok) {
            if (item.id) {
                const idx = resp.resp.findIndex((obj: any) => Number(obj.id) === Number(item.id));
                if (idx > -1) {
                    resp.resp[idx] = item;
                    this.setItem(endpoint, resp.resp);
                    return {
                        ok: true,
                        msg: `${ETIQUETAS[endpoint]} se guardó correctamente`,
                        resp: item
                    }
                }
                return  {
                    ok: false,
                    msg: `${endpoint}: objeto no encontrado`,
                    resp: `ID: ${item.id}`
                }
            } else {
                let id = 1;
                if (resp.resp.length) {
                    const sorted = resp.resp.sort((a: any, b: any): number => {
                        if (a.id > b.id) {
                            return -1;
                        } else if (a.id < b.id) {
                            return 1;
                        }
                        return 0;
                    });
                    const last = sorted[0];
                    id = last.id + 1;
                }
                item.id = id;
                resp.resp.push(item);
                this.setItem(endpoint, resp.resp);
                return {
                    ok: true,
                    msg: `${ETIQUETAS[endpoint]} se guardó correctamente`,
                    resp: item
                }
            }
        }
        return resp;
    }

    delete(endpoint: string, id: number): ServiceResponse {
        let resp = this.getAll(endpoint);
        if (resp.ok) {
            const idx = resp.resp.findIndex((obj: any) => obj.id === id);
            if (idx > -1) {
                resp.resp.splice(idx,1);
                this.setItem(endpoint, resp.resp);
                return {
                    ok: true,
                    msg: `${ETIQUETAS[endpoint]} se eliminó correctamente`,
                    resp: `ID: ${id}`
                }
            }
            return  {
                ok: false,
                msg: `${endpoint}: objeto no encontrado`,
                resp: `ID: ${id}`
            }
        }
        return resp;
    }

    get(endpoint: string, id: number): ServiceResponse {
        let resp = this.getAll(endpoint);
        if (resp.ok) {
            const idx = resp.resp.find((obj: any) => obj.id === id);
            if (idx > -1) {
                return {
                    ok: true,
                    msg: `GET ${endpoint} ${id}`,
                    resp: resp.resp
                }
            }
            return  {
                ok: false,
                msg: `${endpoint}: objeto no encontrado`,
                resp: `ID: ${id}`
            }
        }
        return resp;
    }

    getAll(endpoint: string): ServiceResponse {
        const array = localStorage.getItem(endpoint);
        if (array) {
            return {
                ok: true,
                msg: `${endpoint}: Lista`,
                resp: JSON.parse(array)
            }
        }
        return {
            ok: false,
            msg: 'URL no encontrada',
            resp: 'endpoing no disponible'
        }
    }

    setItem(endpoint: string, items: IUsuario[] | ICliente[] | IProducto[] | IVenta[]) {
        localStorage.setItem(endpoint, JSON.stringify(items));
    }

    initStorage(): void {
        for (const service of SERVICES) {
            const resp = this.getAll(service);
            if (!resp.ok) {
                this.setItem(service, []);
            }
        }
        this.checkTestUser();
    }

    checkTestUser(): void {
        const users = [{id: 1, codigo: 'test', nombre: 'Test' }];
        this.setItem('usuarios', users);
    }
}
