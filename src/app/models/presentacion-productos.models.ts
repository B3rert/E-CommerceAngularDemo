export class PresentacionProductoModel{
 constructor(
    public factor_Conversion: number,
    public producto: number,
    public unidad_Medida: number,
    public tipo_Factor_Conversion: number,
    public tipo_Precio: number,
    public factor_Venta: number,
    public presentacion: string,
    public des_Tipo_Precio: string,
    public precio_Unidad: string,
    public descuento_Por: object,
    public descuento_Val: object,
    public fecha_Ini: object,
    public fecha_Fin: object,
    public nombre_Moneda: string,
    public moneda: number,
    public des_Tipo_Factor_Conversion: string,
    public abreviatura_Tipo_Factor_Conversion: string,
    public des_Producto: string,
    public descripcion_Alt_Producto: string,
    public iD_Producto: string,
    public des_Unidad_Medida: string,
    public tipo_Cambio:number,
    public url_Img: string,
    public cantidad: number
 ){}
 
 
}