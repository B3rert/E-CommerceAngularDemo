# E-commerce Angular .Net Core

Tienda en línea con angular y .Net Core.

## Caracteristicas

* Seleccionar tipo de pedido (a domicilio, recoger en tienda, recoger en bodega, etc).

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/tipo_pedido.png?raw=true"  width="50%" >

* Seleccionar tienda en la que se hará el pedido.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/seleccionar_tienda.png?raw=true"  width="50%" >

* Tienda en línea, productos disponibles, categorías, barra de navegación entre categorías, buscadores y filtros de búsqueda.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/tienda_en_linea.png?raw=true"  width="50%" >

* Detalles de un producto (variantes de precio, variantes del producto, etc).

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/detalle_producto.png?raw=true"  width="50%" >

* Agregar productos al carrito de compras (iniciar un pedido).

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/mi_carrito.png"  width="50%">

* Proceso de confirmación de un pedido, datos para realizar el pedido (datos personales, datos de facturación, datos para entrega).

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/formulario_pago.png?raw=true"  width="50%" >
<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/formulario_pago2.png?raw=true"  width="50%" >

* Confirmar pedido, agregar forma de pago.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/forma_pago.png?raw=true"  width="50%" >

* Es posble también agregar varias formas de pago seleccionando `multiples formas de pago.`

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/forma_pago_seleccionar_mutiple.png?raw=true"  width="50%" >

* Si hay varias formas de pago es necesario agregar montos a las multiples formas de pago seleccionadas.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/forma_pago_rellenar_mutiple.png?raw=true"  width="50%" >

* Agregar nueva forma de pago, (solo es posible si se ha seleccionado la opción de multipoles formas de pago).

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/forma_pago_agregar_mutiple.png?raw=true"  width="50%" >

* Confirmar pedido, muestra un resumen del pedido realizado con los datos considerados más importantes antes de confirmar un pedido.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/confirmar_pedido.png?raw=true"  width="50%" >

* Inicio de sesión.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/form_login.png?raw=true"  width="50%" >

* Registro de usuario.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/regitsro_user.png?raw=true"  width="50%" >

* Recuperar contraseña.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/recuperar_pass.png?raw=true"  width="50%" >

* Lista de pedidos realizados por el usuario, divididos en secciones, **Pendientes** para pedidos guardados sin confirmar que pueden ser reanudados y **Confirmados** para pedidos que ya han sido confirmados por el usuario y que están siendo procesados para su continuación.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/pedidos.png?raw=true"  width="50%" >

* Detalles de un pedido hecho por el usuario, se muestran los productos (items) agregados al pedido, fecha del pedido y total del pedido.

<img src="https://github.com/B3rert/E-CommerceAngular/blob/master/src/app/views/resumen_pedidos.png?raw=true"  width="50%" >

* Información de la cuenta, si se han guardo datos del usuario, estos datos se guardan al rellenar los datos de facturación y se guardan solamnete en el navegador por lo que puede no encontrarlos en otros dispositivos donde se inicie sesión.

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

Si ya está ejecutando Angular CLI clone el proyecto y ejecute `npm install` para descargar las dependencias. Luego ejecute `ng serve` para ejecutar el servidor de Angular. Por defecto angular escucha en el puerto `4200` o `http://localhost:4200/` que es lo mismo, puede especificar el puerto con la bandera `--port` tal que `ng serve --port 4144`, por ejemplo.

## Producción
* Cambie la dirección de origen de las apis en `src/assets/configuraciones.js` si es necesario.
* Ejecute `ng build --prod` para construir el proyecto. 

Los archivos para producción se almacenan en la carpeta `dist/`. Use estos archivos para desplegar la aplicacion en un servidor.

## Notas
El contenido de los componentes están directamente relacionados a una base de datos externa por lo que varios de los elementos se generan dinamicamnete a partir de los valores agregados en la base de datos, la base de datos usada en el proyecto no se adjunta en el reposiorio, por lo que puede tener probelmas al ejecutar el proyecto si no cuenta con los recursos necesarios ya que el proyecto no está optimizado para una demostracion sin una base de datos.

Puede encontrar el pryecto para las apis usadas [aquí.](https://github.com/B3rert/E-Commerce-ApiRestCore)
