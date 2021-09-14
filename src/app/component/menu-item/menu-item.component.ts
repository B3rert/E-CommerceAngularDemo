import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
