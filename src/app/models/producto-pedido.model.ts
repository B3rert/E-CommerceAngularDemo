export class ProductPedidoModel {
    constructor(
        public producto_Id: string,
        public descripcion: string,
        public descripcion_Alt: string,
        public url_Img: string,
        public producto:number,
        public unidad_Medida: number,
        public precio_unidad: number,
        public precio_cantidad:number,
        public precio_cantidad_string:string,
        public cantidad: number
    ){}

}

