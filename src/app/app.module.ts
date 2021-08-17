import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
//import {} from '@ng-bootstrap/ng-bootstrap'
//angularMaterial
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardMdImage, MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from '@angular/material/toolbar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { app_routing } from './app.routes';
import { TiendaTipoComponent } from './component/tienda-tipo/tienda-tipo.component';
import { TiendaComponent } from './component/tienda/tienda.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectTiendaComponentComponent } from './component/select-tienda-component/select-tienda-component.component';



@NgModule({
  declarations: [
    AppComponent,
    TiendaTipoComponent,
    TiendaComponent,
    SelectTiendaComponentComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    app_routing,
    FontAwesomeModule,
    BrowserAnimationsModule,
    //Angular Material
    //MatCardModule,
    //MatCardMdImage,
    //MatGridListModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
