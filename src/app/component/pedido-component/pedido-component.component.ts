import {AfterViewInit, Component,OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1984891, name: 'Juanio 15, 2021', weight: 1.0079, symbol: 'Cancelado'},
  {position: 545542, name: 'Juanio 15, 2021', weight: 4.0026, symbol: 'Cancelado'},
  {position: 3548468, name: 'Juanio 15, 2021', weight: 6.941, symbol: 'Cancelado'},
  {position: 454844, name: 'Juanio 15, 2021', weight: 9.0122, symbol: 'Cancelado'},
  {position: 84845, name: 'Juanio 15, 2021', weight: 10.811, symbol: 'Cancelado'},
  {position: 65454, name: 'Juanio 15, 2021', weight: 12.0107, symbol: 'Cancelado'},
  {position: 745474, name: 'Juanio 15, 2021', weight: 14.0067, symbol: 'Cancelado'},
  {position: 7548548, name: 'Juanio 15, 2021', weight: 15.9994, symbol: 'Cancelado'},
  {position: 921640, name: 'Juanio 15, 2021', weight: 18.9984, symbol: 'Cancelado'},
  {position: 104545, name: 'Juanio 15, 2021', weight: 20.1797, symbol: 'Cancelado'},
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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA

}
