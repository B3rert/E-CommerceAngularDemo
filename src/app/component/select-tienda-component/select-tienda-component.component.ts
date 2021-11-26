import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tienda } from 'src/app/interfaces/tienda.interface';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-select-tienda-component',
  templateUrl: './select-tienda-component.component.html',
  styleUrls: ['./select-tienda-component.component.css'],
  providers:[
    TiendaService
  ]
})
export class SelectTiendaComponentComponent implements OnInit {

  forma_pedido: any;
  tiendas:Tienda[] = [
    {
      "estacion_Trabajo": 1,
      "tienda": "ANTIGUA GUATEMALA",
      "nombre": "ANTIGUA GUATEMALA",
      "descripcion": "ANTIGUA GUATEMALA",
      "bodega": 3,
      "bodega_Tienda": "TIENDA EN LINEA JOCOTENANDO",
      "imagen_Tienda": "https://thumbs.dreamstime.com/b/plantilla-de-dise%C3%B1os-logotipos-tiendas-m%C3%B3viles-dise%C3%B1o-ilustraci%C3%B3n-icono-del-vector-logotipo-compras-bolsa-compra-para-negocios-197295034.jpg",
      "tipo_Documento": 46,
      "serie_Documento": "1",
      "empresa": 1
    },
    {
      "estacion_Trabajo": 2,
      "tienda": "GUATEMALA, GUATEMALA",
      "nombre": "GUATEMALA, GUATEMALA",
      "descripcion": "GUATEMALA, GUATEMALA",
      "bodega": 4,
      "bodega_Tienda": "TIENDA EN LINEA ZONA 2 GUATEMALA",
      "imagen_Tienda": "https://thumbs.dreamstime.com/b/plantilla-de-dise%C3%B1os-logotipos-tiendas-m%C3%B3viles-dise%C3%B1o-ilustraci%C3%B3n-icono-del-vector-logotipo-compras-bolsa-compra-para-negocios-197295034.jpg",
      "tipo_Documento": 46,
      "serie_Documento": "2",
      "empresa": 1
    }
  ];

  progressBar = true;

  constructor(
    private router:Router,
    private _tiendaService:TiendaService
  ) { 

    this.getTiendas();

    this.forma_pedido = sessionStorage.getItem("FormaPedido");
  }

  ngOnInit(): void {
  }

  tiendaSeleccionada(tienda:any){
    
    sessionStorage.setItem('tienda',JSON.stringify(tienda));
    //let tiendasel = JSON.stringify(tienda);
    this.router.navigate(['/tienda'])
  };

  //Obtener tiendas disponibles
  getTiendas() {
    this.progressBar = true;
    if (this.tiendas.length == 1) {
      this.tiendaSeleccionada(this.tiendas[0]);
    }

    this.progressBar = false;
  }
}