import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
/**
 * Icons fontawesome
 */
import { faLandmark, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faShuttleVan } from '@fortawesome/free-solid-svg-icons';
import { faDolly } from '@fortawesome/free-solid-svg-icons';
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { PedidoEstructura, Trasaccion } from 'src/app/interfaces/documento-estructura.interface';
import { PedidoService } from 'src/app/services/pedido.service';

import { UserService } from 'src/app/services/user.service';
import { GenericActionsDialogComponent } from '../dialog/generic-actions-dialog/generic-actions-dialog.component';

@Component({
  selector: 'app-pedido-component',
  templateUrl: './pedido-component.component.html',
  styleUrls: ['./pedido-component.component.css'],
  providers: [
    UserService,
    PedidoService
  ]
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
  faUserCheck = faUserCheck;
  faShuttleVan = faShuttleVan;
  faDolly = faDolly;
  faPlaneArrival = faPlaneArrival;
  faBuilding = faBuilding;
  faArrowLeft = faArrowLeft;

  viewAcount = false;
  viewPedido = true;
  viewDetailsPedido = false;

  pedidos = true;
  detalles_pedido = true;
  detalles_usuario = true;

  tienda_seleccionada: any;
  progress_pedidos = false;

  optionsUser: boolean[] = [
    false, true, false, false
  ];

  jsonOpsyionUser: any[] = [
    {
      "option": "Tienda en linea",
      "icon": faShoppingCart
    },
    {
      "option": "Mis pedidos",
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
      "option": "Cerrar Sesión",
      "icon": faSignOutAlt
    }
  ];

  jsonHead: any[] = [];
  jsonPedidos: any[] = [];
  pedidoActual: any;
  transacciones:Trasaccion[] = [];
  //pedidosPedidoActual: PedidoEstructura ={};
  token: any;
  userName: string = "Nombre_Usuario";

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
    private dialog: MatDialog,
    private _userService: UserService,
    private _pedidoService: PedidoService
  ) {

    this.token = _userService.getToken()

    if (this.token) {
      this.getUserName(this.token);
    }

    this.getPedido();
    let tienda = sessionStorage.getItem("tienda");
    this.tienda_seleccionada = JSON.parse(tienda!);
  }

  ngOnInit(): void {
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

  navStatusTracking(pedido: any) {
    this.viewPedido = false;
    this.viewAcount = false;
    this.viewDetailsPedido = true;
    this.pedidoActual = pedido;
    
    this.transacciones.splice(0, this.transacciones.length);
    
    let pedidosPedidoActual: PedidoEstructura = JSON.parse(this.spliceQuotes(pedido.estructura))

    pedidosPedidoActual.Tra.forEach(element => {
      this.transacciones.push(element);
    });
    
  }

  getUserName(token: any): any {
    this._userService.getUserNameToken(token).subscribe(
      res => {
        this.userName = JSON.parse(JSON.stringify(res)).messege;
      },
      err => {
        console.error(err);
      });
  }

  navigateToStore() {
    this.router.navigate(['/tienda']);
  }

  viewPedidos() {
    this.viewPedido = true;
    this.viewAcount = false;
    this.viewDetailsPedido = false;
  }

  navigateToSelectStore() {
    const dialogRef = this.dialog.open(GenericActionsDialogComponent, {
      data: {
        tittle: "¿Cambiar Tienda?",
        description: "Es posible que se pierdan datos que no hayan sido guardados."
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/seleccion'])
      }
    });
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
        sessionStorage.removeItem("Token");
        localStorage.removeItem("Token");
        this.router.navigate(['/tienda']);
      }
    });
  }

  getPedido() {
    
    this._userService.getUserNameToken(this.token).subscribe(
      res => {
        let user = JSON.parse(JSON.stringify(res));
        if (user.messege) {
          this._pedidoService.getDocumentoEstructuraUser(this.token, user.messege).subscribe(
            res => {
              let pedidos = JSON.parse(JSON.stringify(res));
              pedidos.forEach((element: any) => {
                //Quitar la condicion, solo es un pedido con una estructura distinta
                if (element.consecutivo_Interno != 18) {
                  let pedidosPedidoActual: PedidoEstructura = JSON.parse(this.spliceQuotes(element.estructura))
                  this.calcTotal(pedidosPedidoActual.Tra);
                  let item = {
                    "pedido": element.consecutivo_Interno,
                    "fecha": element.fecha_Hora,
                    "estado": element.estado,
                    "estructura": element.estructura,
                    "total": `Q.${this.NumberToString(this.calcTotal(pedidosPedidoActual.Tra))}`,
                  }
                  this.jsonPedidos.push(item);
                }
              });
            },
            err => {
              console.error(err);
            });
        }
      }
      , err => {
        console.error(err);

      });
  }

  calcTotal(arr:Trasaccion[]):number{
    let total:number = 0;
    arr.forEach(element => {
      total = total + element.Tra_Monto;
    });
    return total;
  }

  spliceQuotes(variable: string): string {
    variable = variable;
    var regex = new RegExp("'", "g");
    var res = variable.replace(regex, "\"");
    return res;
  }

  formatterFecha(fecha: Date) {
    const date = new Date(fecha); // had to remove the colon (:) after the T in order to make it work
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const myFormattedDate = `${day}/${(monthIndex + 1)}/${year} ${hours}:${minutes}`;
    return myFormattedDate;
  }

  NumberToString(numero: number) {
    if (numero % 1 == 0) {
      //es entero 
      return numero.toString() + ".00";
    } else {
      //es decimal
      let numeros = numero.toString().split(".", 2)

      if (numeros[1].length == 1) {
        return numero.toString() + "0"
      } else {
        return numero.toString();
      }
    }
  }

  //repetir pedido
  repeatOrder(){
    console.log("Repetir orden");
    
  }
}