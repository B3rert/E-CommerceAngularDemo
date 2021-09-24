export interface TipoPedido{
    elemento_Asignado:number
    descripcion: string;
    observacion_1: string;
    imagen_EA: string;
}

export interface ListaTipoPedido{
    item:TipoPedido[];
}