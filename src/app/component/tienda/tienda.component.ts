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
    this.router.navigate(['/seleccion','recoger']);
  }

  navEntregar(){
    this.router.navigate(['/seleccion','domicilio']);

  }

}
