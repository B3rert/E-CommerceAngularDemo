export interface Pedido {
    pedido: any[];
    user: string;
    tienda_pedido: any;
    tipo_pedido: any;
}

export interface GetDocumentoEstructura {
    consecutivo_Interno: string;
    fecha_Hora: Date;
    tipo_Estructura: string;
    estructura: string;
    estado: number;
}

export interface DelPutDocumentoEstructura {
    pConsecutivo_Interno: number
    pEstructura: string
    pUserName: string
    pEstado: number
}
