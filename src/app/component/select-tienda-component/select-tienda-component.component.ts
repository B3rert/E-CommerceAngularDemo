import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  tiendas:any;
  progressBar = true;

  constructor(
    private _ac: ActivatedRoute,
    private router:Router,
    private _tiendaService:TiendaService
  ) { 

    this.getTiendas();
    
    this._ac.paramMap.subscribe(paramas => {

      //Parametros recibidos domicilio, recojer 
      this.forma_pedido = paramas.get('forma_pedido');
    });
  }

  ngOnInit(): void {
  }

  tiendaSeleccionada(tienda:any){
    sessionStorage.setItem('tienda',JSON.stringify(tienda));
    //let tiendasel = JSON.stringify(tienda);
    this.router.navigate(['/tienda',this.forma_pedido])
  };

  //Obtener tiendas disponibles
  getTiendas() {
    this.progressBar = true;
    this._tiendaService.getTienda().subscribe(
      res => {
        let resJson = JSON.stringify(res);
        this.tiendas = JSON.parse(resJson);
        this.progressBar = false;
      },
      err => {
        alert("Error de servidor");
        console.log(err);
        this.progressBar = false;
      }
    );
  }
}