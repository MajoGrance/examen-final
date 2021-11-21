import { Component, OnInit, Type } from '@angular/core';
import { ProductoModel, IProducto } from '../../../models/producto.model';
import { FormGroup } from '@angular/forms';
import { ProductoService } from '../../../services/abm/producto.service';
import { MessageService } from 'src/app/services/utils/message.service';
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
    selector: 'app-productos-ventana',
    templateUrl: './productos-ventana.component.html',
    styleUrls: ['./productos-ventana.component.scss']
})
export class ProductosVentanaComponent implements OnInit {
    /**
     * Nombre del registro.
     */
    name = `Producto`;
    /**
     * Nombre del registro.
     */
    title = `Producto`;
    /**
     * Nombre del registro.
     */
    titleField = 'codigo';
    /**
     * Url base del registro.
     */
    url = '/sitio/productos';
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
    model: Type<any> = ProductoModel;
    /**
     * Objeto inicial del formulario.
     */
    object!: IProducto;
    /**
     * Nombre del registro.
     */
    formGroup: FormGroup = new this.model().getFormGroup();


    constructor(
        public service: ProductoService,
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
