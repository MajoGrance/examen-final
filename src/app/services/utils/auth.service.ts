import { Injectable } from '@angular/core';
import { IUsuario } from '../../models/usuario.model';
import { ServiceResponse } from '../../shared/interfaces';
import { UsuarioService } from '../abm/usuario.service';

const USER_VAR_NAME = 'final2021.currentUser';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private user: UsuarioService
    ) { }

    async login(code: string, password: string): Promise<ServiceResponse> {
        const resp = await this.user.getAll();
        if (resp.ok) {
            const user = resp.resp.find((obj: IUsuario) => obj.codigo === code);
            if (user) {
                localStorage.setItem(USER_VAR_NAME, JSON.stringify(user));
                return {
                    ok: true,
                    msg: 'Sesión inicialda',
                    resp: 'Se ha podido iniciar sesión'
                }
            } else {
                return {
                    ok: false,
                    msg: 'Credenciales inválidas',
                    resp: 'No se pudo iniciar sesión'
                }
            }
        }
        return {
            ok: false,
            msg: 'Ha ocurrido un error inesperado',
            resp: 'No se pudo iniciar sesión'
        }
    }

    logout(): ServiceResponse {
        localStorage.removeItem(USER_VAR_NAME);
        return {
            ok: true,
            msg: 'Operación realizada con éxito',
            resp: 'Se ha cerrado sesión'
        }
    }

    getCurrentUser(): IUsuario | null{
        const user = localStorage.getItem(USER_VAR_NAME);
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }
}
