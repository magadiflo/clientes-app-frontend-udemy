export interface TokenResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    info_adicional: string;
    apellido: string;
    nombre: string;
    email: string;
    jti: string;
}

export interface Payload {
    info_adicional: string;
    user_name: string;
    scope: string[];
    apellido: string;
    exp: number;
    nombre: string;
    authorities: string[];
    jti: string;
    email: string;
    client_id: string;
}
