import { Component, OnInit } from '@angular/core';
import { CRUDColumn } from '../../../shared/components/crud/crud.component';
import { ProductoService } from '../../../services/abm/producto.service';

@Component({
    selector: 'app-productos-lista',
    templateUrl: './productos-lista.component.html',
    styleUrls: ['./productos-lista.component.scss']
})
export class ProductosListaComponent implements OnInit {
    /**
     * Nombre del registro.
     */
    title = 'Productos';
    /**
     * Lista de configuraciones de las columnas del registro.
     */
    columns: CRUDColumn[] = [
        {header: 'ID', type: 'id', field: 'id', filterType: 'numeric'},
        {header: 'Código', type: 'text', field: 'codigo', filterType: 'text'},
        {header: 'Nombre', type: 'text', field: 'nombre', filterType: 'text'},
        {header: 'Precio Venta', type: 'numeric', field: 'precio_venta', filterType: 'numeric'},
        {header: 'Existencia', type: 'numeric', field: 'existencia', filterType: 'numeric'},
    ]
    /**
     * Url base del registro.
     */
    url = '/sitio/productos';
    /**
     * Nombre del campo correspondiente al id del registro.
     */
    idField = 'id';
     
    constructor(
        public service: ProductoService
    ) { }
     
    ngOnInit(): void { }
}
