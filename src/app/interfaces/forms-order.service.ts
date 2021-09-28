export interface DatosPersonales{
    nombre:string,
    apellido?:string,
    telefono:string,
    tlefono_alt?:string,
    correo_electronico:string
}

export interface DatosEntrega{
    ciudad:string,
    direccion_entrega?:string,
    fecha_recoger?:string,
    observacion?:string,
}

export interface DatosFactura{
    nombre:string,
    nit:string,
    direccion:string,
}

export interface DataUser{
    datos_personales:DatosPersonales,
    datos_entrega:DatosEntrega,
    datos_factura:DatosFactura,
    user_name:string,
    checked:boolean
}