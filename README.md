# E-commerce Angular

Carrito de compras hecho en angular, y .Net Core en el [backend](https://github.com/B3rert/E-Commerce-ApiRestCore), el contenido de los componentes se genera a partir de [Apis conectadas a una base de datos](https://github.com/B3rert/E-Commerce-ApiRestCore), la base de datos usada no se adjunta en el reposiorio, por lo que puede tener probelmas al ejecutar el proyecto.

## Caracteristicas

* Seleccionar tipo de pedido.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/tipo_pedido.png?raw=true"  width="50%" >

* Seleccionar tienda.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/seleccionar_tienda.png?raw=true"  width="50%" >

* Tienda en línea, con todos los productos y categorías para filtrar productos.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/tienda_en_linea.png?raw=true"  width="50%" >

* Detalle producto.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/detalle_producto.png?raw=true"  width="50%" >

* Carrito de compras con productos.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/mi_carrito.png"  width="50%">

* Confirmar pedido, datos de usuario.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/formulario_pago.png?raw=true"  width="50%" >
<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/formulario_pago2.png?raw=true"  width="50%" >

* Confirmar pedido, seleccionar forma de pago.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/forma_pago.png?raw=true"  width="50%" >

* Confirmar pedido, seleccionar multiples formas de pago.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/forma_pago_seleccionar_mutiple.png?raw=true"  width="50%" >

* Confirmar pedido, rellenar multiples formas de pago.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/forma_pago_rellenar_mutiple.png?raw=true"  width="50%" >

* Confirmar pedido, agregar nueva forma de pago.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/forma_pago_agregar_mutiple.png?raw=true"  width="50%" >

* Confirmar pedido.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/confirmar_pedido.png?raw=true"  width="50%" >

* Inicio de Sesión.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/form_login.png?raw=true"  width="50%" >

* Registro de Usuario.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/regitsro_user.png?raw=true"  width="50%" >

* Recuperar Contraseña.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/recuperar_pass.png?raw=true"  width="50%" >

* Lista de Pedidos

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/pedidos.png?raw=true"  width="50%" >

* Detalles del pedido.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/resumen_pedidos.png?raw=true"  width="50%" >

* Información de la cuenta.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/info_cuenta.png?raw=true"  width="50%" >

* Página de recurso no encontrado.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/not_found.png?raw=true"  width="50%" >

<!--
## Demo

Puede ver aquí una [demostración del proyecto.](https://b3rert.github.io/E-CommerceAngular)
-->
## Ejecutar el proyecto en un entorno de desarrollo

Para ejecutar el proyecto necesita el entorno de Angular CLI.
* [Node.js](https://nodejs.org/es/download/)
* [Angular CLI](https://angular.io/guide/setup-local#install-the-angular-cli)

Si ya está ejecutando Angular CLI clone el proyecto y ejecute `npm install` para descargar las dependencias. Luego ejecute `ng serve` para ejecutar el servidor de Angular. Por defecto angular escucha en `http://localhost:4200/` puede especificar el puerto con `ng serve --port 4144`

## Producción
* Cambie la dirección de las apis en `src/assets/configuraciones.js`.
* Ejecute `ng build --prod` para construir el proyecto. 

Los archivos para producción se almacenan en la carpeta `dist/`. Use estos archivos para desplegar la aplicacion en un servidor.
