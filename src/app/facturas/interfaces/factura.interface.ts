import { ItemFactura } from '../../facturas/interfaces/item-factura.interface';
import { Cliente } from '../../clientes/interfaces/cliente.interface';

export interface Factura {
    id?: number,
    descripcion?: string,
    observacion?: string,
    createAt?: string,
    total?: number,
    items?: ItemFactura[],
    cliente?: Cliente,
}