import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  navRecoger(){
    sessionStorage.setItem("FormaPedido","recoger");
    this.router.navigate(['/seleccion']);
  }

  navEntregar(){
    sessionStorage.setItem("FormaPedido","domicilio");
    this.router.navigate(['/seleccion']);

  }

}
