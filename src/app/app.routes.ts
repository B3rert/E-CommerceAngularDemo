import { RouterModule, Routes } from "@angular/router";
import { TiendaTipoComponent } from "./component/tienda-tipo/tienda-tipo.component";
import { TiendaComponent } from "./component/tienda/tienda.component";

const app_routes: Routes = [
    { path: 'home', component: TiendaComponent },
    {path:'tienda/:forma_pedido',component:TiendaTipoComponent},
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
    { path: '', redirectTo: '/home', pathMatch: 'full' }

];

export const app_routing = RouterModule.forRoot(app_routes);