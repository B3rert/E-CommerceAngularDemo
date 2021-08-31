import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pedido-component',
  templateUrl: './pedido-component.component.html',
  styleUrls: ['./pedido-component.component.css']
})

export class PedidoComponentComponent implements OnInit {

  faEye = faEye;

  jsonHead: any[] = [];
  jsonPedidos: any[] = [
    {
      "pedido": "4564as8",
      "fecha": "25/08/2021",
      "estado": "Cancelado",
      "total": "Q.205.00",
    },
    {
      "pedido": "275257",
      "fecha": "25/08/2021",
      "estado": "Cancelado",
      "total": "Q.205.00"
    },
    {
      "pedido": "728728",
      "fecha": "25/08/2021",
      "estado": "Cancelado",
      "total": "Q.205.00"
    },
    {
      "pedido": "72872",
      "fecha": "25/08/2021",
      "estado": "Cancelado",
      "total": "Q.205.00"
    },
    {
      "pedido": "2877",
      "fecha": "25/08/2021",
      "estado": "Cancelado",
      "total": "Q.205.00"
    },
    {
      "pedido": "78737777",
      "fecha": "25/08/2021",
      "estado": "Cancelado",
      "total": "Q.205.00"
    }
  ];

  constructor() {
    this.resolveKeyJson(this.jsonPedidos[0]);
  }

  ngOnInit(): void {
  }

  resolveKeyJson(objectJson: any) {

    for (var key in objectJson) {

      this.jsonHead.push(key);

    }
  }

  viewDetails(pedido:any){
    console.log(pedido);
  }
}
