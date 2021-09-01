import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
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
import { GenericActionsDialogComponent } from '../dialog/generic-actions-dialog/generic-actions-dialog.component';

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


  viewAcount = false;
  viewPedido = true;
  viewDetailsPedido = false;


  optionsUser: boolean[] = [
    false, true, false, false
  ];

  jsonOpsyionUser: any[] = [
    {
      "option": "Tienda en linea",
      "icon": faShoppingCart
    },
    {
      "option": "Pedidos",
      "icon": faClipboardList
    },
    {
      "option": "Cambiar Tienda",
      "icon": faStore
    },
    {
      "option": "Cuenta",
      "icon": faUser
    },
    {
      "option": "Salir",
      "icon": faSignOutAlt
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

  constructor(
    private router: Router,
    private dialog: MatDialog
    ) {
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
    this.viewPedido = false;
    this.viewAcount = false;
    this.viewDetailsPedido = true;
  }

  changeClass(index: number) {

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

    //action();
    switch (index) {
      case 0:
        this.navigateToStore();
        break;
      case 1:
        this.viewPedidos();
        break;
      case 2:
        this.navigateToSelectStore();
        break;
      case 3:
        this.viewInfoAcount();
        break;
      case 4:
      this.singOut()
        break;

      default:
        alert("No hay acciones disponibles");
        break;
    }

  }

  navigateToStore() {
    this.router.navigate(['/tienda', sessionStorage.getItem("FormaPedido")]);
  }

  viewPedidos() {
    this.viewPedido = true;
    this.viewAcount = false;
    this.viewDetailsPedido = false;

  }

  navigateToSelectStore() {



    this.router.navigate(['/seleccion',sessionStorage.getItem("FormaPedido")])
  }

  viewInfoAcount() {
    this.viewAcount = true;
    this.viewPedido = false;
    this.viewDetailsPedido = false;

  }

  singOut() {

    const dialogRef = this.dialog.open(GenericActionsDialogComponent, {
      data: {
        tittle: "¿Cerrar Sesión?",
        description: "Es posible que se pierdan datos que no hayan sido guardados."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Cerrar sesión(y): ${result}`);
      }else{
        console.log(`Cerrar sesión(n): ${result}`);
      }
    });
    
  }

}
