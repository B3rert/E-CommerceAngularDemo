export interface DocumentoEstructura{
    pEstructura:      string;
    pUserName:        string;
    pTipo_Estructura: number;
    pEstado:          number;
    pM_UserName:      any;
}

export interface Trasaccion {
    Tra_Bodega: number;
    Tra_Producto: number;
    Tra_Unidad_Medida: number;
    Tra_Cantidad: number;
    Tra_Monto: number;
    Tra_Tipo_Cambio: number;
    Tra_Moneda: number;
    Tra_Tipo_Precio: number;
    Tra_Factor_Conversion?: any;
    Tra_Descripcion: string;
    Tra_Imagen?: string;
}

export interface PedidoEstructura {
    Doc_Tipo_Documento: number;
    Doc_Serie_Documento: string;
    Doc_Empresa: number;
    Doc_Estacion_Trabajo: number;
    Doc_UserName: string;
    Doc_Nombre: string;
    Doc_NIT: string;
    Doc_Direccion: string;
    Doc_Referencia?: any;
    Doc_Observacion_1?: any;
    Doc_Tipo_Pago: number;
    Doc_Elemento_Asignado: number;
    Doc_Bodega: number;
    Tra: Trasaccion[];
}