import { BaseModel, IBase } from './base.model';
export interface IUsuario extends IBase{
    codigo:   string;
    nombre:   string;
}

export class UsuarioModel extends BaseModel implements IUsuario {
    codigo!:  string;
    nombre!:  string;
}