import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  fecha: string;
  pedido: string;
  total: string;
  estado: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {pedido: "18578", fecha: 'Julio 18, 2021', total: "Q.1.0079", estado: 'Cancelado'},
  {pedido: "2272", fecha: 'Julio 18, 2021', total: "Q.4.0026", estado: 'Cancelado'},
  {pedido: "725873", fecha: 'Julio 18, 2021', total: "Q.6.941", estado: 'Cancelado'},
  {pedido: "472872872", fecha: 'Julio 18, 2021', total: "Q.9.0122", estado: 'Cancelado'},
  {pedido: "57287", fecha: 'Julio 18, 2021', total: "Q.10.811", estado: 'Cancelado'},
  {pedido: "67287", fecha: 'Julio 18, 2021', total: "Q.12.0107", estado: 'Cancelado'},
  {pedido: "772727", fecha: 'Julio 18, 2021', total: "Q.14.0067", estado: 'Cancelado'},
  {pedido: "89739", fecha: 'Julio 18, 2021', total: "Q.15.9994", estado: 'Cancelado'},
  {pedido: "979347", fecha: 'Julio 18, 2021', total: "Q.18.9984", estado: 'Cancelado'},
  {pedido: "107837", fecha: 'Julio 18, 2021', total: "Q.20.1797", estado: 'Cancelado'},
];
@Component({
  selector: 'app-pedido-component',
  templateUrl: './pedido-component.component.html',
  styleUrls: ['./pedido-component.component.css']
})
export class PedidoComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   displayedColumns: string[] = ['pedido', 'fecha', 'total', 'estado'];
  dataSource = ELEMENT_DATA;

}
