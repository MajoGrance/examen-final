import { Component, OnInit } from '@angular/core';
import { CRUDColumn } from '../../../shared/components/crud/crud.component';
import { VentaService } from '../../../services/abm/venta.service';

@Component({
    selector: 'app-ventas-lista',
    templateUrl: './ventas-lista.component.html',
    styleUrls: ['./ventas-lista.component.scss']
})
export class VentasListaComponent implements OnInit {
    /**
     * Nombre del registro.
     */
    title = 'Ventas';
    /**
     * Lista de configuraciones de las columnas del registro.
     */
    columns: CRUDColumn[] = [
        {header: 'ID', type: 'id', field: 'id', filterType: 'numeric'},
        {header: 'Fecha', type: 'date', field: 'fecha', filterType: 'date'},
        {header: 'RUC Cliente', type: 'text', field: 'cliente.ruc', filterType: 'text', refName: 'cliente', refField: 'ruc'},
        {header: 'Nombre Cliente', type: 'text', field: 'cliente.nombre', filterType: 'text', refName: 'cliente', refField: 'nombre_apellido'},
        {header: 'Nro. Factura', type: 'text', field: 'numero_factura', filterType: 'text'},
        {header: 'Total', type: 'numeric', field: 'total', filterType: 'numeric'},
    ]
    /**
     * Url base del registro.
     */
    url = '/sitio/ventas';
    /**
     * Nombre del campo correspondiente al id del registro.
     */
    idField = 'id';
    
    constructor(
        public service: VentaService
    ) { }
    
    ngOnInit(): void { }
}
