import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClienteModel, ICliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/abm/cliente.service';
import { IReportColumn } from '../../shared/components/report/report.component';
import { VentaService } from '../../services/abm/venta.service';
import { StringDatePipe } from '../../shared/pipes/string-date.pipe';
import { DateStringPipe } from '../../shared/pipes/date-string.pipe';
import { IVenta } from '../../models/venta.model';
import { ToastService } from '../../services/utils/toast.service';

@Component({
    selector: 'app-reporte-resumido',
    templateUrl: './reporte-resumido.component.html',
    styleUrls: ['./reporte-resumido.component.scss'],
    providers: [
        StringDatePipe,
        DateStringPipe
    ]
})
export class ReporteResumidoComponent implements OnInit {
    form = this.fb.group({
        desde_fecha: [new Date(), Validators.required],
        hasta_fecha: [new Date(), Validators.required],
        cliente_id: [''],
        cliente_ruc: [''],
        cliente_nombre: ['']
    });
    clienteModel: Type<any> = ClienteModel;
    source: any[] = [];
    columns: IReportColumn[] = [
        {header: 'RUC Cliente', type: 'text', field: 'cliente.ruc', filterType: 'text', refName: 'cliente', refField: 'ruc'},
        {header: 'Nombre Cliente', type: 'text', field: 'cliente.nombre_apellido', filterType: 'text', refName: 'cliente', refField: 'nombre_apellido'},
        {header: 'Fecha', type: 'date', field: 'fecha', filterType: 'date'},
        {header: 'Nro. Factura', type: 'text', field: 'numero_factura', filterType: 'text'},
        {header: 'Total', type: 'numeric', field: 'total', filterType: 'numeric'},
    ]

    constructor(
        private fb: FormBuilder,
        private ventaService: VentaService,
        private stringDate: StringDatePipe,
        private dateString: DateStringPipe,
        private toastService: ToastService,
        public clienteService: ClienteService
    ) { }

    ngOnInit(): void {
        this.run();
    }

    pasteCliente(obj: ICliente | null): void {
        this.form.get('cliente_id')?.setValue(obj?.id);
        this.form.get('cliente_nombre')?.setValue(obj?.nombre_apellido);
    }

    async run(): Promise<void> {
        if (this.form.valid) {
            const desde = this.stringDate.transform(this.dateString.transform(this.form.value.desde_fecha));
            const hasta = this.stringDate.transform(this.dateString.transform(this.form.value.hasta_fecha));
            const resp = await this.ventaService.getAll();
            if (resp.ok) {
                this.source = resp.resp.filter((obj: IVenta): boolean => {
                    const fecha = this.stringDate.transform(this.dateString.transform(new Date(obj.fecha)));
                    if (!(fecha >= desde && fecha <= hasta)) {
                        return false;
                    }
                    if (this.form.value.cliente_id && !(obj.cliente?.id === this.form.value.cliente_id)) {
                        return false;
                    }
                    return true;
                });
            } else {
                this.toastService.show('top-right', 'error', resp.msg, resp.resp);
            }
        } else {
            this.toastService.show('top-right', 'error', 'No se pudo obtener el reporte', 'Corrija todos los errores del formulario');
        }
    }
}
