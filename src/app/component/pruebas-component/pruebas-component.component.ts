import { Component, OnInit } from '@angular/core';
import {faSquare} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pruebas-component',
  templateUrl: './pruebas-component.component.html',
  styleUrls: ['./pruebas-component.component.css']
})
export class PruebasComponentComponent implements OnInit {

  faSquare = faSquare;

  constructor() { }

  ngOnInit(): void {
  }

}
