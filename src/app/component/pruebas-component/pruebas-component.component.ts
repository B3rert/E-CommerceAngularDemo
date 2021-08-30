import { Component, OnInit } from '@angular/core';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pruebas-component',
  templateUrl: './pruebas-component.component.html',
  styleUrls: ['./pruebas-component.component.css']
})
export class PruebasComponentComponent implements OnInit {

  faSquare = faSquare;
  jsonPrecios: any[] = [
    ['Precio 1', 'Precio 2', 'Precio 3', 'Precio 3', 'Precio 4', 'Precio 5'],
    ['Precio 6', 'Precio 7', 'Precio 8', 'Precio 9', 'Precio 10', 'Precio 11'],
    ['Precio 12', 'Precio 13', 'Precio 14', 'Precio 15', 'Precio 16', 'Precio 17',],
    ['Precio 18', 'Precio 19', 'Precio 20', 'Precio 21', 'Precio 22', 'Precio 23',],
    ['Precio 24', 'Precio 25', 'Precio 26', 'Precio 27', 'Precio 28', 'Precio 29'],
    ['Precio 30', 'Precio 31', 'Precio 32', 'Precio 33', 'Precio 34', 'Precio 25',]
  ];

  typesOfShoes: string[] = [];
  typesOfTona: number[] = [1, 2, 3, 4, 5];
  mostrarPrecios: boolean[] = [];


  jsonColor: any[] = [
    {
      "color": "#FCF821",
      "text": "Amarillo"
    },
    {
      "color": "#FC2121",
      "text": "Rojo"
    },
    {
      "color": "#FC9521",
      "text": "Naranja"
    },
    {
      "color": "#AC21FC",
      "text": "Violeta"
    },
    {
      "color": "#5F5859",
      "text": "Gris"
    },
    {
      "color": "#910A1A",
      "text": "Corinto"
    }
  ]

  selectColor(indexColor: any) {

    this.typesOfShoes = this.jsonPrecios[indexColor];

    let contValor = 0;
    this.mostrarPrecios.forEach(element => {

      if (contValor != indexColor) {
        if (element) {
          this.mostrarPrecios[contValor] = false;
        }
      }
      contValor++;
    });

    let value = this.mostrarPrecios[indexColor];

    value ? value = false : value = true;

    this.mostrarPrecios[indexColor] = value;
  }

  constructor() {
    this.jsonColor.forEach(element => {
      this.mostrarPrecios.push(false);
    });
  }

  ngOnInit(): void {
  }
}