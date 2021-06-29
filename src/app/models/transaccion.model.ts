export class TransaccionModel{
    constructor(
        public Tra_Bodega: number,
        public Tra_Producto: number,
        public Tra_Unidad_Medida: number,
        public Tra_Cantidad: number,
        public Tra_Monto: number,
        public Tra_Tipo_Cambio: number,
        public Tra_Moneda: number,
        public Tra_Tipo_Precio: number,
        public Tra_Factor_Conversion?: any,
    ){}
}