import { RouterModule, Routes } from "@angular/router";
import { PruebasComponentComponent } from "./component/pruebas-component/pruebas-component.component";
import { SelectTiendaComponentComponent } from "./component/select-tienda-component/select-tienda-component.component";
import { TiendaTipoComponent } from "./component/tienda-tipo/tienda-tipo.component";
import { TiendaComponent } from "./component/tienda/tienda.component";

const app_routes: Routes = [
    { path: 'home', component: TiendaComponent },
    {path:'seleccion/:forma_pedido',component:SelectTiendaComponentComponent},
    {path:'tienda/:forma_pedido',component:TiendaTipoComponent},
    {path:'pruebas',component:PruebasComponentComponent},
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    //{ path: '**', redirectTo: '/pruebas', pathMatch: 'full' },
    //{ path: '', redirectTo: '/pruebas', pathMatch: 'full' }

];

export const app_routing = RouterModule.forRoot(app_routes);