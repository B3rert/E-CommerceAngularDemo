import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NavItem } from 'src/app/interfaces/nav-item.interface';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input()
  items!: NavItem[];
  @ViewChild('childMenu', {static: true}) public childMenu: any;
  @Output() private categoria = new EventEmitter<number>();
  
  constructor(
  ) { }

  ngOnInit(): void {
  }

  updateGetproductos(categoria:number){
    this.categoria.emit(categoria);
  }
  callProduct(item:any){
    this.categoria.emit(item.categoria)
   // console.log(item);
  }

}
