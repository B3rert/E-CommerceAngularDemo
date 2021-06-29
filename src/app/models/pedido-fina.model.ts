import { TransaccionModel } from "./transaccion.model";

export class PedidoFinalModel{
    constructor(
        public Doc_Tipo_Documento: number,
        public Doc_Serie_Documento: string,
        public Doc_Empresa: number,
        public Doc_Estacion_Trabajo: number,
        public Doc_UserName: string,
        public Doc_Nombre: string,
        public Doc_NIT: string,
        public Doc_Direccion: string,
        public Doc_Referencia: any,
        public Doc_Observacion_1: any,
        public Doc_Tipo_Pago: number,
        public Tra: TransaccionModel
    ){}
}