import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavItem } from 'src/app/interfaces/nav-item.interface';
import { TiendaTipoComponent } from '../tienda-tipo/tienda-tipo.component';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  providers:[TiendaTipoComponent]
})
export class MenuItemComponent implements OnInit {

  @Input()
  items!: NavItem[];
  @ViewChild('childMenu', {static: true}) public childMenu: any;

  constructor(
    private comp:TiendaTipoComponent
  ) { }

  ngOnInit(): void {
  }

  callProduct(item:any){
    this.comp.getProductos(item.categoria);
   // console.log(item);
  }

}
