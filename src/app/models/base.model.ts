import { UsuarioService } from '../services/abm/usuario.service';
import { ClienteService } from '../services/abm/cliente.service';
import { ProductoService } from '../services/abm/producto.service';
import { VentaService } from '../services/abm/venta.service';
import { ServiceResponse } from '../shared/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
const fb = new FormBuilder();

export interface IBase {
    id:  number;
}

export class BaseModel implements IBase {
    id!: number;

    async save(service: UsuarioService | ClienteService | ProductoService | VentaService): Promise<ServiceResponse> {
        if (service) {
            let method;
            const obj = await this.serialize();
            const check = await service.check(obj);
            if (check !== true) {
                return {
                    ok: false,
                    msg: 'No se ha podido guardar el registro',
                    resp: check
                }
            }
            method = service.save(obj);
            const resp = await method;
            if (resp.ok) {
                this.id = resp.resp.id;
            }
            return resp;
        } else {
            return {
                ok: false,
                msg: 'Servicio con errores o no proveído',
                resp: 'Provea el servicio para guardar y verifique que este implemente el método save'
            };
        }
    }

    async delete(service: UsuarioService | ClienteService | ProductoService | VentaService): Promise<ServiceResponse> {
        if (service && service.delete) {
            const resp = await service.delete(this.id);
            if (resp.ok) {
                this.id = resp.resp.id;
            }
            return resp;
        } else {
            return {
                ok: false,
                msg: 'Servicio con errores o no proveído',
                resp: 'Provea el servicio para eliminar y verifique que este implemente el método delete'
            };
        }
    }

    serialize(): any {
        const obj: any = {};
        const currentObject: any = this;
        for (const key of this.keys()) {
            obj[key] = currentObject[key];
        }
        return obj;
    }

    keys(): string[] {
        const keysList: string[] =  Object.keys(this);
        return keysList;
    }

    deserialize(input: object): this {
        Object.assign(this, input);
        return this;
    }

    getFormGroup(): FormGroup {
        return fb.group({
            id: ['']
        });
    }
}