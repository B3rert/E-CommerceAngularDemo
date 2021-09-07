# E-commerce Angular

Carrito de compras hecho en angular, y .Net Core en el [backend](https://github.com/B3rert/E-Commerce-ApiRestCore), el contenido de los componentes se genera a partir de [Apis conectadas a una base de datos](https://github.com/B3rert/E-Commerce-ApiRestCore), la base de datos usada no se adjunta en el reposiorio, por lo que puede tener probelmas al ejecutar el proyecto.

## Caracteristicas

## Ejecutar el proyecto en un entorno de desarrollo

Para ejecutar el proyecto necesita el entorno de Angular CLI.
* [Node.js](https://nodejs.org/es/download/)
* [Angular CLI](https://angular.io/guide/setup-local#install-the-angular-cli)

Si ya está ejecutando Angular CLI clone el proyecto y ejecute `npm install` para descargar las dependencias. Luego ejecute `ng serve` para ejecutar el servidor de Angular. Por defecto angular escucha en `http://localhost:4200/` puede especificar el puerto con `ng serve --port 4144`

## Producción
* Cambie la dirección de las apis en `src/app/services/ApiServer.ts`.
* Ejecute `ng build --prod` para construir el proyecto. 

Los archivos para producción se almacenan en la carpeta `dist/`. Use estos archivos para desplegar la aplicacion en un servidor.
