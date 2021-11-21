import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef, HostListener, Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IPasteColumns } from './paste-window/paste-window.component';
import { LoadingService } from '../../../../services/utils/loading.service';
import { ToastService } from '../../../../services/utils/toast.service';

@Component({
    selector: 'app-reference-input',
    templateUrl: './reference-input.component.html',
    styleUrls: ['./reference-input.component.scss']
})
export class ReferenceInputComponent implements OnInit {
    @ViewChild('input', {static: false}) input!: ElementRef;
    @Input() control!: AbstractControl;
    @Input() placeholder = 'Escriba aqui...';
    @Input() name = '';
    @Input() readonly!: boolean;
    @Input() noPadding!: boolean;
    @Input() noEmpresa!: boolean;
    @Input() label = '';
    @Input() service: any;
    @Input() clase!: any;
    @Input() icon = 'pi pi-search';
    @Input() idField = 'id';
    @Input() codigoRegistro = '';
    @Input() funcionFiltro: any;
    @Input() funcionFiltroParent: any;
    @Input() columns: IPasteColumns[] = [];
    @Output() changeValue = new EventEmitter();
    @Output() paste = new EventEmitter();
    errors = {
        maxLenght: 'Excede la longitud máxima', 
        required: 'Este campo es requerido',
        pattern: 'Formato inválido',
        invalidRef: 'No se encontró el registro',
    };
    model!: string;
    display = false;
    source: any[] = [];
    lastId: any = null;

    constructor(
        private loadingService: LoadingService,
        private toastService: ToastService,
    ) { }

    ngOnInit(): void {
        this.control.setValue(this.control?.value);
        this.model = this.control?.value;
        this.lastId = this.model?this.model:null;
        this.initField();
        this.control.valueChanges.subscribe({
            next: () => {
                this.model = this.control?.value;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.control) {
            this.control.setValue(this.control?.value);
            this.model = this.control?.value;
            this.lastId = this.model?this.model:null;
            this.initField();
            this.control.valueChanges.subscribe({
                next: () => {
                    this.model = this.control?.value;
                }
            });
        }
        if (changes.clase) {
            if (this.clase) {
                this.columns = new this.clase().getPasteItems();
            }
        }
        if (changes.funcionFiltro) {
            if(this.control.value) {
                setTimeout(() => {
                    this.onPaste(true);
                });
            }
        }
    }

    async initField(): Promise<void> {
        await this.getPermisos();
        // await this.getSource();
    }

    /**
     * Acción a ejecutarse cada que se edita el campo.
     * @param value nuevo valor a asignarse al control del formulario.
     */
    change(value: any): void {
        this.control.setValue(value);
        this.changeValue.emit(value);
    }

    async onPaste(force?:boolean): Promise<void> {
        const id = this.control?.value;
        if (id === this.lastId && !force) {
            return;
        }
        this.lastId = id;
        if (id) {
            this.loadingService.setLoading(true);
            await this.getPermisos();
            await this.getSource();
            const objetoLista = this.source.find(obj => String(obj[this.idField]) === String(id));
            if (objetoLista) {
                const obj: any = {};
                obj[this.idField] = id;
                const resp = await this.service.getAll();
                if (resp.ok) {
                    let objResp = resp.resp;
                    if (resp.resp.length) {
                        objResp = this.getFromList(resp.resp, id);
                    }
                    this.paste.emit(objResp);
                } else {
                    this.paste.emit(null);
                }
            } else {
                this.control.setErrors({invalidRef: true});
                this.paste.emit(null);
            }
            this.loadingService.setLoading(false);
        } else {
            this.paste.emit(null);
        }   
    }

    getFromList(lista: any[], id: any) {
        return lista.find(obj => String(obj[this.idField]) === String(id))
    }

    async getSource(): Promise<void> {
        let obj: any = {};
        const resp = await this.service.getAll();
        if (resp.ok) {
            const source = resp.resp.filter((obj: any) => {
                let value = true;
                if (obj.hasOwnProperty('activo')) {
                    if (!obj.activo) {
                        value = false;
                    }
                }
                
                return value;
            })
            if (this.funcionFiltro) {
                this.source = this.funcionFiltro(this.funcionFiltroParent, source);
            } else {
                this.source = source;
            }
        } else {
            this.toastService.show('top-right', 'error', resp.msg, resp.resp);
        }
    }

    /**
     * Abrea la ventana de busqueda del registro referenciado.
     */
    async openPasteWindow(): Promise<void> {
        this.loadingService.setLoading(true);
        await this.getPermisos();
        await this.getSource();
        this.display = true;
        this.loadingService.setLoading(false);
    }

    /**
     * Obtiene los valores de permisos en la lista: crear y eliminar
     */
     async getPermisos(): Promise<void> {
        // const permisos = await this.seguridadService.getPermisos();
        // const registro = registros.find(reg => this.codigoRegistro === reg.codigo);
        // if (registro) {
        //     this.filtrarUsuario = permisos[registro.codigo]?.filtrar_usuario;
        // }
    }

    /**
     * Evento a ejecutarse al seleccionar una fila del paste window.
     */
    async selectRow(row: any): Promise<void> {
        this.input.nativeElement.focus();
        this.control.setValue(row[this.idField]);
        this.display = false;
        this.input.nativeElement.blur();
    }
}
