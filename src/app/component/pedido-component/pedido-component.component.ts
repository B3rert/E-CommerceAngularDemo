import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
/**
 * Icons fontawesome
 */
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pedido-component',
  templateUrl: './pedido-component.component.html',
  styleUrls: ['./pedido-component.component.css']
})

export class PedidoComponentComponent implements OnInit {

  //Iconos
  faUserCircle = faUserCircle;
  faTimes = faTimes;
  faBars = faBars;
  faSignOutAlt = faSignOutAlt;
  faInfo = faInfo;
  faUser = faUser;
  faClipboardList = faClipboardList;
  faEye = faEye;
  faShoppingCart = faShoppingCart;
  faStore = faStore;


  optionsUser: boolean[] = [
    false, true, false, false
  ];

  jsonOpsyionUser: any[] = [
    {
      "option": "Tienda en linea",
      "icon": faShoppingCart,
      "action": this.navigateToStore
    },
    {
      "option": "Pedidos",
      "icon": faClipboardList,
      "action": this.viewPedidos
    },
    {
      "option": "Cambiar Tienda",
      "icon": faStore,
      "action":this.navigateToSelectStore
    },
    {
      "option": "Cuenta",
      "icon": faUser,
      "action": this.viewInfoAcount
    },
    {
      "option": "Salir",
      "icon": faSignOutAlt,
      "action": this.singOut
    }
  ];

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
      "estado": "Aceptar",
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

  //Abrir/Cerrar SideNav
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  @ViewChild('sidenavend')
  sidenavend!: MatSidenav;

  close(reason: string) {
    this.sidenav.close();
    this.sidenavend.close();
  }



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

  viewDetails(pedido: any) {
    console.log(pedido);
  }

  changeClass(index: number, action:any) {

    let countStatus = 0;
    this.optionsUser.forEach(element => {
      if (element) {
        this.optionsUser[countStatus] = false;
      }
      countStatus++;
    });

    let value = this.optionsUser[index];
    value ? value = false : value = true;
    this.optionsUser[index] = value;

    action();

  }

  
  navigateToStore(){
    console.log("Navegar a la tienda");
  }

  viewPedidos(){
    console.log("Ver pedidos");
  }

  navigateToSelectStore(){
    console.log("Navegar a seleccionar tienda");
  }

  viewInfoAcount(){
    console.log("Ver informacion de la cuenta");
  }

  singOut(){
    console.log("Salir/Cerrar Sesión");
  }

}
