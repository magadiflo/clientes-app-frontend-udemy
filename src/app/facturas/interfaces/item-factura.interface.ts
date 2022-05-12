import { Producto } from './producto.interface';

export interface ItemFactura {
    id?: number,
    producto?: Producto,
    cantidad?: number,
    importe?: number,
}