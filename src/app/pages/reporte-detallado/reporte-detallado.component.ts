import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductoModel, IProducto } from '../../models/producto.model';
import { IReportColumn } from '../../shared/components/report/report.component';
import { VentaService } from '../../services/abm/venta.service';
import { StringDatePipe } from '../../shared/pipes/string-date.pipe';
import { DateStringPipe } from '../../shared/pipes/date-string.pipe';
import { ToastService } from '../../services/utils/toast.service';
import { IVenta } from '../../models/venta.model';
import { ProductoService } from '../../services/abm/producto.service';

@Component({
    selector: 'app-reporte-detallado',
    templateUrl: './reporte-detallado.component.html',
    styleUrls: ['./reporte-detallado.component.scss'],
    providers: [StringDatePipe, DateStringPipe]
})
export class ReporteDetalladoComponent implements OnInit {
    form = this.fb.group({
        desde_fecha: [new Date(), Validators.required],
        hasta_fecha: [new Date(), Validators.required],
        producto_id: [''],
        producto_codigo: [''],
        producto_nombre: ['']
    });
    productoModel: Type<any> = ProductoModel;
    source: any[] = [];
    columns: IReportColumn[] = [
        {header: 'RUC Cliente', type: 'text', field: 'cliente.ruc', filterType: 'text', refName: 'cliente', refField: 'ruc'},
        {header: 'Nombre Cliente', type: 'text', field: 'cliente.nombre_apellido', filterType: 'text', refName: 'cliente', refField: 'nombre_apellido'},
        {header: 'Fecha', type: 'date', field: 'fecha', filterType: 'date'},
        {header: 'Código Producto', type: 'text', field: 'producto.codigo', filterType: 'text', refName: 'producto', refField: 'codigo'},
        {header: 'Nombre Producto', type: 'text', field: 'producto.nombre', filterType: 'text', refName: 'producto', refField: 'nombre'},
        {header: 'Cantidad', type: 'numeric', field: 'cantidad', filterType: 'numeric'},
        {header: 'Total', type: 'numeric', field: 'total', filterType: 'numeric'},
    ]

    constructor(
        private fb: FormBuilder,
        private ventaService: VentaService,
        private stringDate: StringDatePipe,
        private dateString: DateStringPipe,
        private toastService: ToastService,
        public productoService: ProductoService
    ) { }

    ngOnInit(): void {
        this.run();
    }

    pasteProducto(obj: IProducto | null): void {
        this.form.get('producto_id')?.setValue(obj?.id);
        this.form.get('producto_nombre')?.setValue(obj?.nombre);
    }

    async run(): Promise<void> {
        if (this.form.valid) {
            const desde = this.stringDate.transform(this.dateString.transform(this.form.value.desde_fecha));
            const hasta = this.stringDate.transform(this.dateString.transform(this.form.value.hasta_fecha));
            const resp = await this.ventaService.getAll();
            const detalle: any[] = [];
            if (resp.ok) {
                const headers: IVenta[] = resp.resp.filter((obj: IVenta): boolean => {
                    const fecha = this.stringDate.transform(this.dateString.transform(new Date(obj.fecha)));
                    if (!(fecha >= desde && fecha <= hasta)) {
                        return false;
                    }
                    return true;
                });
                for (const obj of headers) {
                    for (const row of obj.detalle) {
                        if (this.form.value.producto_id) {
                            if (!(this.form.value.producto_id === row.producto?.id)) {
                                continue;
                            }
                        }
                        const newDetalle = {
                            cliente: obj.cliente,
                            cliente_id: obj.cliente?.id,
                            cliente_nombre: obj.cliente?.nombre_apellido,
                            cliente_ruc: obj.cliente?.ruc,
                            fecha: obj.fecha,
                            producto: row.producto,
                            producto_id: row.producto?.id,
                            producto_codigo: row.producto?.codigo,
                            producto_nombre: row.producto?.nombre,
                            cantidad: row.cantidad,
                            total: row.total,
                        }
                        detalle.push(newDetalle);
                    }
                }
                this.source = detalle;
            } else {
                this.toastService.show('top-right', 'error', resp.msg, resp.resp);
            }
        } else {
            this.toastService.show('top-right', 'error', 'No se pudo obtener el reporte', 'Corrija todos los errores del formulario');
        }
    }
}
