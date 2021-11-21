import { Component, OnInit } from '@angular/core';
import { CRUDColumn } from 'src/app/shared/components/crud/crud.component';
import { ClienteService } from '../../../services/abm/cliente.service';

@Component({
    selector: 'app-clientes-lista',
    templateUrl: './clientes-lista.component.html',
    styleUrls: ['./clientes-lista.component.scss']
})
export class ClientesListaComponent implements OnInit {
    /**
     * Nombre del registro.
     */
    title = 'Clientes';
    /**
     * Lista de configuraciones de las columnas del registro.
     */
    columns: CRUDColumn[] = [
        {header: 'ID', type: 'id', field: 'id', filterType: 'numeric'},
        {header: 'RUC', type: 'text', field: 'ruc', filterType: 'text'},
        {header: 'Nombre', type: 'text', field: 'nombre_apellido', filterType: 'text'},
    ]
    /**
     * Url base del registro.
     */
    url = '/sitio/clientes';
    /**
     * Nombre del campo correspondiente al id del registro.
     */
    idField = 'id';
    
    constructor(
        public service: ClienteService
    ) { }
    
    ngOnInit(): void { }

}
