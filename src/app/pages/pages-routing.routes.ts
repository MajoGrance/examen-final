import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ProductosListaComponent } from './productos/productos-lista/productos-lista.component';
import { ProductosVentanaComponent } from './productos/productos-ventana/productos-ventana.component';
import { ClientesListaComponent } from './clientes/clientes-lista/clientes-lista.component';
import { ClientesVentanaComponent } from './clientes/clientes-ventana/clientes-ventana.component';
import { VentasListaComponent } from './ventas/ventas-lista/ventas-lista.component';
import { VentasVentanaComponent } from './ventas/ventas-ventana/ventas-ventana.component';
import { ReporteResumidoComponent } from './reporte-resumido/reporte-resumido.component';
import { ReporteDetalladoComponent } from './reporte-detallado/reporte-detallado.component';
import { MessageService } from '../services/utils/message.service';
import { WindowGuard } from '../guards/window.guard';
import { PagesGuard } from '../guards/pages.guard';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [PagesGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'productos', component: ProductosListaComponent },
            { path: 'productos/:id', component: ProductosVentanaComponent, canDeactivate: [WindowGuard] },
            { path: 'clientes', component: ClientesListaComponent },
            { path: 'clientes/:id', component: ClientesVentanaComponent, canDeactivate: [WindowGuard] },
            { path: 'ventas', component: VentasListaComponent },
            { path: 'ventas/:id', component: VentasVentanaComponent, canDeactivate: [WindowGuard] },
            { path: 'reporte-resumido', component: ReporteResumidoComponent },
            { path: 'reporte-detallado', component: ReporteDetalladoComponent },
            { path: '**', redirectTo: 'home' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        WindowGuard
    ]
})
export class PagesRoutingModule { }
