import { Region } from './region.interface';

export interface Cliente {
    id?: number,
    nombre?: string,
    apellido?: string,
    email?: string,
    createAt?: string,
    foto?: string,
    region?: Region,
}
