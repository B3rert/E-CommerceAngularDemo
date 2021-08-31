import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
/**
 * Icons fontawesome
 */
 import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
 import { faSearch } from '@fortawesome/free-solid-svg-icons';
 import { faTimes } from '@fortawesome/free-solid-svg-icons';
 import { faPlus } from '@fortawesome/free-solid-svg-icons';
 import { faMinus } from '@fortawesome/free-solid-svg-icons';
 import { faUser } from '@fortawesome/free-solid-svg-icons';
 import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
 import { faBars } from '@fortawesome/free-solid-svg-icons';
 import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
 import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toolbar-sidenav-component',
  templateUrl: './toolbar-sidenav-component.component.html',
  styleUrls: ['./toolbar-sidenav-component.component.css']
})
export class ToolbarSidenavComponentComponent implements OnInit {


   //Iconos
   faUserCircle = faUserCircle;
   faShoppingCart = faShoppingCart;
   faSearch = faSearch;
   faTimes = faTimes;
   faPlus = faPlus;
   faMinus = faMinus;
   faUser = faUser;
   faBars = faBars;
   faChevronDown = faChevronDown;
   faChevronRight = faChevronRight;
   
    //Abrir/Cerrar SideNav
    @ViewChild('sidenav')
    sidenav!: MatSidenav;
    @ViewChild('sidenavend')
    sidenavend!: MatSidenav;
  
    close(reason: string) {
      this.sidenav.close();
      this.sidenavend.close();
    }
  constructor() { }

  ngOnInit(): void {
  }

}
