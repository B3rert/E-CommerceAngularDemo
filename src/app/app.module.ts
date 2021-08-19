import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
//import {} from '@ng-bootstrap/ng-bootstrap'
//angularMaterial
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { app_routing } from './app.routes';
import { TiendaTipoComponent } from './component/tienda-tipo/tienda-tipo.component';
import { TiendaComponent } from './component/tienda/tienda.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectTiendaComponentComponent } from './component/select-tienda-component/select-tienda-component.component';
import { LoginDialogComponentComponent } from './component/dialog/login-dialog-component/login-dialog-component.component';
import { PruebasComponentComponent } from './component/pruebas-component/pruebas-component.component';



@NgModule({
  declarations: [
    AppComponent,
    TiendaTipoComponent,
    TiendaComponent,
    SelectTiendaComponentComponent,
    LoginDialogComponentComponent,
    PruebasComponentComponent,
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
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
