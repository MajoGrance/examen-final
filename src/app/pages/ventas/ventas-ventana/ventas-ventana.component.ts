import { Component, OnInit, Type } from '@angular/core';
import { VentaModel, IVenta, IVentaDetalle } from '../../../models/venta.model';
import { FormGroup, FormArray } from '@angular/forms';
import { VentaService } from '../../../services/abm/venta.service';
import { MessageService } from 'src/app/services/utils/message.service';
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ICliente, ClienteModel } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/abm/cliente.service';
import { CRUDColumn } from '../../../shared/components/crud/crud.component';

@Component({
    selector: 'app-ventas-ventana',
    templateUrl: './ventas-ventana.component.html',
    styleUrls: ['./ventas-ventana.component.scss']
})
export class VentasVentanaComponent implements OnInit {
    /**
     * Nombre del registro.
     */
    name = `Venta`;
    /**
     * Nombre del registro.
     */
    title = `Venta`;
    /**
     * Nombre del registro.
     */
    titleField = 'id';
    /**
     * Url base del registro.
     */
    url = '/sitio/ventas';
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
    model: Type<any> = VentaModel;
    /**
     * Objeto inicial del formulario.
     */
    object!: IVenta;
    /**
     * Nombre del registro.
     */
    formGroup: FormGroup = new this.model().getFormGroup();
    /**
     * Clase de referencia a clientes.
     */
    clienteModel: Type<any> = ClienteModel;
    /**
     * Descripción de campos del detalle de ventas.
     */
    detalleColumns: CRUDColumn[] = [
        { field: 'producto.id', header: 'ID Producto', type: 'id', filterType: 'text', refName: 'producto', refField: 'id' },
        { field: 'producto.codigo', header: 'Código Producto', type: 'text', filterType: 'text', refName: 'producto', refField: 'codigo' },
        { field: 'producto.nombre', header: 'Nombre Producto', type: 'text', filterType: 'text', refName: 'producto', refField: 'nombre' },
        { field: 'cantidad', header: 'Cantidad', type: 'numeric', filterType: 'numeric' },
        { field: 'total', header: 'Total', type: 'numeric', filterType: 'numeric' },
    ];
    /**
     * Indicador de que el detalle que esta siendo editado es nuevo.
     */
    detalleNuevo = false;
    /**
     * Indicador para mostrar el modal detalle.
     */
    displayDetalle = false;
    /**
     * Formulario para agregar o editar un detalle de tipo hora.
     */
    detalleForm = new VentaModel().getDetalleFormGroup();
    /**
     * Form Array del detalle de ventas del formulario principal.
     */
    get detalle(): FormArray {
        return this.formGroup?.get('detalle') as FormArray;
    }


    constructor(
        public service: VentaService,
        public clienteService: ClienteService,
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
 
    pasteCliente(obj: ICliente | null): void {
        this.formGroup.get('cliente_nombre')?.setValue(obj?.nombre_apellido);
        this.formGroup.get('cliente')?.setValue(obj);
    }

    /**
    * Abre el modal de detalle para agregar.
    */
    crearDetalle(): void {
        this.detalleForm = new VentaModel().getDetalleFormGroup();
        this.detalleNuevo = true;
        this.displayDetalle = true;
    }

    /**
    * Abre el modal de detalle para editar.
    */
    editarDetalle( obj: IVentaDetalle ): void {
        if ( this.editando ) {
            this.detalleForm = new VentaModel().getDetalleFormGroup(obj);
            this.detalleNuevo = false
            this.displayDetalle = true;
        }
    }

    /**
    * Elimina detalles.
    */
    async deleteDetalle( event: any ): Promise<void> {
        console.log(event);
    }

    /**
     * Confirma la inserción o edición de un detalle de venta.
     * @param obj formulario de inserción o edición de un detalle de venta.
     */
    async confirmarDetalle( obj: FormGroup ): Promise<void> {
        const idx = this.detalle.controls.findIndex(control => obj.value.producto?.id === control.value.producto?.id);
        if (idx > -1) {
            let newQty = obj.value.cantidad;
            let newTotal = obj.value.total;
            if (this.detalleNuevo) {
                newQty = this.detalle.controls[idx].value.cantidad + obj.value.cantidad;
                newTotal = newQty * obj.value.producto?.precio_venta;
            }
            this.detalle.controls[idx].get('cantidad')?.setValue(newQty);
            this.detalle.controls[idx].get('total')?.setValue(newTotal);
            this.displayDetalle = false;
        } else {
            this.detalle.push(obj);
            this.displayDetalle = false;
        }
        this.sumUp();
    }

    async sumUp(): Promise<void> {
        let total = 0;
        for (const detalle of this.detalle.controls) {
            total += detalle.value.total;
        }
        this.formGroup.get('total')?.setValue(total);
    }
}
