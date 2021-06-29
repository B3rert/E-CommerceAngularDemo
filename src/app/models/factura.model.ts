export class UserFactura{
    constructor(
        public Nombre:string,
        public Apellido:string,
        public Nit: string,
        public Correo_electronico: string,
        public Ciudad:string,
        public Fecha_Hora_Recoger:string,
        public direccion_pedido:string,
        public Telefono:string,
        public Observacion:string
    ){}
}