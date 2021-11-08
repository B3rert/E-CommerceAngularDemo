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
  tiendas:Tienda[] = [];
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
    this._tiendaService.getTienda().subscribe(
      res => {
        this.tiendas = <Tienda[]>res;

        if (this.tiendas.length == 1) {
          this.tiendaSeleccionada(this.tiendas[0]);
        }

        this.progressBar = false;
      },
      err => {
        alert("Error de servidor (2)"); //2 No se han podido obtenmer las tiendas /api/Tienda  PA_bsc_Tienda_Linea
        console.log(err);
        this.progressBar = false;
      }
    );
  }
}