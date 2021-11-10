export interface Pedido {
    pedido: any[];
    user: string;
    tienda_pedido: any;
    tipo_pedido: any;
    consecutivo: number;
    status: number;
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

export interface ProductPedido{
    producto_Id: string,
    descripcion: string,
    descripcion_Alt: string,
    url_Img?: string,
    producto:number,
    unidad_Medida: number,
    precio_unidad: number,
    precio_cantidad:number,
    precio_cantidad_string:string,
    moneda:number,
    tipo_Precio:number,
    tipo_Cambio:number,
    cantidad: number,
}
