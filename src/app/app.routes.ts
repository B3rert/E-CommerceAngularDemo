import { RouterModule, Routes } from "@angular/router";
import { PedidoComponentComponent } from "./component/pedido-component/pedido-component.component";
import { NotFoundPageComponentComponent } from "./component/plantillas/plantillas-notfound/not-found-page-component/not-found-page-component.component";
import { PruebasComponentComponent } from "./component/pruebas-component/pruebas-component.component";
import { SelectTiendaComponentComponent } from "./component/select-tienda-component/select-tienda-component.component";
import { TiendaTipoComponent } from "./component/tienda-tipo/tienda-tipo.component";
import { TiendaComponent } from "./component/tienda/tienda.component";

const app_routes: Routes = [
  { path: 'home', component: TiendaComponent },
  { path: 'seleccion', component: SelectTiendaComponentComponent },
  { path: 'tienda', component: TiendaTipoComponent },
  { path: 'pruebas', component: PruebasComponentComponent },
  { path: 'no-encontrado', component: NotFoundPageComponentComponent },
  { path: 'pedido', component: PedidoComponentComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/no-encontrado', pathMatch: 'full' },
];

export const app_routing = RouterModule.forRoot(app_routes, { useHash: true });