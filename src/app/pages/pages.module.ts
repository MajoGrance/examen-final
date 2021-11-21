import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.routes';
import { HomeComponent } from './home/home.component';
import { ProductosListaComponent } from './productos/productos-lista/productos-lista.component';
import { ProductosVentanaComponent } from './productos/productos-ventana/productos-ventana.component';
import { ClientesListaComponent } from './clientes/clientes-lista/clientes-lista.component';
import { ClientesVentanaComponent } from './clientes/clientes-ventana/clientes-ventana.component';
import { VentasListaComponent } from './ventas/ventas-lista/ventas-lista.component';
import { VentasVentanaComponent } from './ventas/ventas-ventana/ventas-ventana.component';
import { ReporteResumidoComponent } from './reporte-resumido/reporte-resumido.component';
import { ReporteDetalladoComponent } from './reporte-detallado/reporte-detallado.component';
import { SharedModule } from '../shared/shared.module';
import { ModalVentaDetalleComponent } from './ventas/ventas-ventana/modal-venta-detalle/modal-venta-detalle.component';



@NgModule({
    declarations: [
        PagesComponent,
        HomeComponent,
        ProductosListaComponent,
        ProductosVentanaComponent,
        ClientesListaComponent,
        ClientesVentanaComponent,
        VentasListaComponent,
        VentasVentanaComponent,
        ReporteResumidoComponent,
        ReporteDetalladoComponent,
        ModalVentaDetalleComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        SharedModule
    ],
})
export class PagesModule { }
