import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, Type } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ToastService } from '../../../../services/utils/toast.service';
import { VentaModel } from '../../../../models/venta.model';
import { ProductoService } from '../../../../services/abm/producto.service';
import { ProductoModel, IProducto } from '../../../../models/producto.model';

@Component({
  selector: 'app-modal-venta-detalle',
  templateUrl: './modal-venta-detalle.component.html',
  styleUrls: ['./modal-venta-detalle.component.scss']
})
export class ModalVentaDetalleComponent implements OnInit {
    
    @Input() display = false;
    @Input() nuevo = false;
    @Input() form!: FormGroup;
    @Input() formArray!: FormArray;
    @Output() displayChange = new EventEmitter();
    @Output() confirmChanges = new EventEmitter();
    formCopy!: FormGroup;
    productoModel: Type<any> = ProductoModel;

    constructor(
        private toastrService: ToastService,
        public productoService: ProductoService
    ) { }

    ngOnInit(): void {
        this.formCopy = new VentaModel().getDetalleFormGroup(this.form.value);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.form) {
            this.formCopy = new VentaModel().getDetalleFormGroup(this.form.value);
        }
    }

    setDisplay(value: boolean): void {
        this.display = value;
        this.displayChange.emit(this.display);
    }

    confirm(): void {
        this.formCopy.markAllAsTouched();
        if (this.formCopy.valid) {
            this.confirmChanges.emit(this.formCopy);
        } else {
            this.toastrService.show('top-right', 'error', 'Formulario Inválido', 'Complete los campos obligatorios');
        }
    }

    pasteProducto(obj: IProducto | null): void {
        this.formCopy.get('producto_nombre')?.setValue(obj?.nombre);
        this.formCopy.get('producto_id')?.setValue(obj?.id);
        this.formCopy.get('producto')?.setValue(obj);
        this.sumUp();
    }

    sumUp(): void {
        const producto: IProducto = this.formCopy.value.producto;
        if (producto) {
            const total = Number(this.formCopy.value.cantidad) * Number(producto.precio_venta);
            this.formCopy.get('total')?.setValue(total);
        } else {
            this.formCopy.get('total')?.setValue(0);
        }
    }
}
