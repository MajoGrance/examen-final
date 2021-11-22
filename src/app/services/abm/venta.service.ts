import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IVenta, IVentaDetalle } from '../../models/venta.model';
import { IProducto, ProductoModel } from '../../models/producto.model';
import { AppStorageService } from '../utils/app-storage.service';
import { ProductoService } from './producto.service';
import { ServiceResponse } from '../../shared/interfaces';

const storage = new AppStorageService();

@Injectable({
    providedIn: 'root'
})
export class VentaService extends BaseService {
    url = 'ventas';

    constructor(
        private producto: ProductoService
    ) {
        super(storage);
    }

    async check(newObj: IVenta): Promise<true | string> {
        const resp = await this.getAll();
        if (resp.ok) {
            const record =  resp.resp.find((obj: IVenta): boolean => {
                if (obj.numero_factura === newObj.numero_factura && obj.id !== newObj.id) {
                    return true;
                }
                return false;
            });
            const respv = await this.getAll();
            if (respv.ok) {
                const venta: IVenta = respv.resp.find((obj: IVenta) => Number(obj.id) === Number(newObj.id));
                if (venta) {
                    for (const detalle of newObj.detalle) {
                        const detalleOld = venta.detalle.find((obj: IVentaDetalle) => obj.producto?.id === detalle.producto?.id);
                        const respp = await this.producto.get(detalle.producto?.id);
                        if (respp.ok) {
                            if (detalleOld) {
                                const diff = detalle.cantidad - detalleOld.cantidad;
                                const producto: IProducto = respp.resp;
                                if (diff) {
                                    if (producto.existencia - diff >= 0) {
                                        producto.existencia -= diff;
                                        const stock = await (new ProductoModel().deserialize(producto).save(this.producto));
                                    } else {
                                        return `El producto ${detalle.producto?.codigo} no tiene existencia suficiente`;
                                    }
                                }
                            } else {
                                const producto: IProducto = respp.resp;
                                if (producto.existencia - detalle.cantidad >= 0) {
                                    producto.existencia -= detalle.cantidad;
                                    const stock = await (new ProductoModel().deserialize(producto).save(this.producto));
                                } else {
                                    return `El producto ${detalle.producto?.codigo} no tiene existencia suficiente`;
                                }
                            } 
                        } else {
                            return `No se encontro el producto ${detalle.producto?.codigo}`;
                        }
                    }
                    for (const detalle of venta.detalle) {
                        const newDetalle = newObj.detalle.find(obj => obj.producto?.id === detalle.producto?.id);
                        if (!newDetalle) {
                            const respp = await this.producto.get(detalle.producto?.id);
                            if (respp.ok) {
                                const producto: IProducto = respp.resp;
                                producto.existencia += detalle.cantidad;
                                const stock = await (new ProductoModel().deserialize(producto).save(this.producto));
                            }
                        }
                    }
                } else {
                    for (const detalle of newObj.detalle) {
                        const respp = await this.producto.get(detalle.producto?.id);
                        if (respp.ok) {
                            const producto: IProducto = respp.resp;
                            if (producto.existencia - detalle.cantidad >= 0) {
                                producto.existencia -= detalle.cantidad;
                                const stock = await (new ProductoModel().deserialize(producto).save(this.producto));
                            } else {
                                return `El producto ${detalle.producto?.codigo} no tiene existencia suficiente`;
                            }
                        } else {
                            return `No se encontro el producto ${detalle.producto?.codigo}`;
                        }
                    }
                }
            }
            if (record) {
                return `La factura ya fue registrada. Venta: ${record.id}`;
            }
            if (!newObj.detalle.length) {
                return 'Debe agregar al menos un detalle';
            }
            return true;
        }
        return 'Ha ocurrido un error insesperado';
    }

    async onDelete(obj: IVenta): Promise<true | string> {
        for(const detalle of obj.detalle) {
            const respp = await this.producto.get(detalle.producto?.id);
            if (respp.ok) {
                const producto: IProducto = respp.resp;
                producto.existencia += detalle.cantidad;
                const stock = await (new ProductoModel().deserialize(producto).save(this.producto));
            }
        }
        return true;
    }

    async delete(id: number): Promise<ServiceResponse> {
        const obj = (await this.get(id)).resp;
        await this.onDelete(obj);
        return this.storage.delete(this.url, id);
    }
}
