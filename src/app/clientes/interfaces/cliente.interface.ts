import { Region } from './region.interface';
import { Factura } from '../../facturas/interfaces/factura.interface';


export interface Cliente {
    id?: number,
    nombre?: string,
    apellido?: string,
    email?: string,
    createAt?: string,
    foto?: string,
    region?: Region,
    facturas?: Factura[],
}
