import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MessageService } from 'src/app/services/utils/message.service';
import { ClienteService } from '../../../services/abm/cliente.service';
import { FormGroup } from '@angular/forms';
import { ICliente, ClienteModel } from '../../../models/cliente.model';
import { Location } from '@angular/common';

@Component({
    selector: 'app-clientes-ventana',
    templateUrl: './clientes-ventana.component.html',
    styleUrls: ['./clientes-ventana.component.scss']
})
export class ClientesVentanaComponent implements OnInit {

    /**
     * Nombre del registro.
     */
    name = `Cliente`;
    /**
     * Nombre del registro.
     */
    title = `Cliente`;
    /**
     * Nombre del registro.
     */
    titleField = 'ruc';
    /**
     * Url base del registro.
     */
    url = '/sitio/clientes';
    /**
     * Indicador de edición del formulario.
     */
    editando = false;
    /**
     * Indicador de que el formulario corresponde a un registro nuevo.
     */
    nuevo = true;
    /**
     * Indicador de que el formulario se ha modificado.
     */
    modificado = false;
    /**
     * Clase del modelo correspondiente al registro.
     */
    model: Type<any> = ClienteModel;
    /**
     * Objeto inicial del formulario.
     */
    object!: ICliente;
    /**
     * Nombre del registro.
     */
    formGroup: FormGroup = new this.model().getFormGroup();
 
 
    constructor(
        public service: ClienteService,
        private mensajeService: MessageService,
        private location: Location
    ) { }

    ngOnInit(): void { }
 
    /**
     * Determina si se puede desactivar la página.
     * @param currentRoute Contiene la información sobre una ruta asociada al componente, cargado en el outlet.
     * @param currentState Estado actual de la ruta en el navegador.
     * @param nextState Estado siguiente de la ruta en el navegador si se permitiera redireccionar.
     */
    canDeactivate(currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Promise<boolean> | boolean {
        if (!this.editando) {
            return true;
        } else {
            return new Promise((resolve) => {
                if (this.modificado) {
                    this.mensajeService.descartarCambios().then((confirmacion: any) => {
                        if (confirmacion) {
                            resolve(true);
                        } else {
                            resolve(false);
                            this.location.go(currentState.url);
                        }
                    });
                } else {
                    resolve(true);
                }
            });
        }
    }

}
