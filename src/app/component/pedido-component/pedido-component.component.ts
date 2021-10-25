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
import { Estado, EstadosControl } from 'src/app/interfaces/estados.interface';
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

  estados: Estado[] = [];
  estadosControl: EstadosControl[] = [];

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

  jsonPedidos: any[] = [];
  pedidoActual: any;
  transacciones: Trasaccion[] = [];
  //pedidosPedidoActual: PedidoEstructura ={};
  token: any;
  userName: string = "Nombre_Usuario";
  datos_usuario: any;

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

    this.token = _userService.getToken();

    this.loadDataUser();

    if (this.token) {
      this.getUserName(this.token);
      this.getStatusTracking();
    }

    this.getPedido();
    let tienda = sessionStorage.getItem("tienda");
    this.tienda_seleccionada = JSON.parse(tienda!);
  }

  //retorna la descriocion del estado 
  returnNameStatus(status: any) {

    let descripcion;
    this.estados.forEach(element => {
      if (status == element.estado_Objeto) {
        descripcion = element.descripcion;
      }

    });
    return descripcion;
  }

  /*Obtinen los datos guradaddos en el navegador
  *si el usuario de los datos guaradaddos es igual al de la sesion
  *se motrararn los dtaos gurdados, caso contrario no sucede nada
  */
  async loadDataUser() {
    let datos_user = JSON.parse(localStorage.getItem("datos_personales")!);
    if (datos_user) {
      await this.getUserName(this.token);
      if (datos_user.user_name = this.userName) {
        this.datos_usuario = datos_user;
      }
    } else {
      this.datos_usuario = null;
    }
  }

  ngOnInit(): void {
  }

  getStatusTracking() {
    this._pedidoService.getEstados(this.token).subscribe(
      res => {
        //console.log(res);
        this.estados = <Estado[]>res;

        //Muestra los primeros 5 elementos (slice)
        this.estados.slice(0, 5).forEach((element, index) => {

          if (index == 3) {

            let item: EstadosControl = {
              "descripcion": element.descripcion,
              "estado": 2,
              "icon": "pending_actions"
            }

            this.estadosControl.push(item);
          } else if (index == 4) {

            let item: EstadosControl = {
              "descripcion": element.descripcion,
              "estado": 3,
              "icon": "block"
            }

            this.estadosControl.push(item);
          } else {

            let item: EstadosControl = {
              "descripcion": element.descripcion,
              "estado": 1,
              "icon": "check"
            }

            this.estadosControl.push(item);
          }

        });

        // console.log(this.estadosControl);
      },
      err => {
        console.error(err);

        alert("Error de servidor");
      }
    );
  }

  //Cambiar a clase activa cuando se haga click
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

    console.log(pedido);

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

  //Ibtien ele nombrw de usuario a través del token de la sesion
  async getUserName(token: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this._userService.getUserNameToken(token).subscribe(
        res => {
          this.userName = JSON.parse(JSON.stringify(res)).messege;
          resolve();
        },
        err => {
          console.error(err);
          resolve();
        });
    });
  }

  //Navega a la tienda
  navigateToStore() {
    this.router.navigate(['/tienda']);
  }

  //Ver los pedidos
  viewPedidos() {
    this.viewPedido = true;
    this.viewAcount = false;
    this.viewDetailsPedido = false;
  }

  //Navgea a la pantalla de seleccionar tienda
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

  //ver informacion de la cuenta
  viewInfoAcount() {
    this.viewAcount = true;
    this.viewPedido = false;
    this.viewDetailsPedido = false;
  }

  //Cerrar sesion
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

  //Obtiene todos los pedidos hechos por el usuario
  async getPedido() {
    //Obtiene el nombre de usuario logeado
    await this.getUserName(this.token);

    this._pedidoService.getDocumentoEstructuraUser(this.token, this.userName).subscribe(
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
          this.progress_pedidos = false;
        });
      },
      err => {
        console.error(err);
        this.progress_pedidos = false;

      });
  }

  //calcula el totoal de un pedido
  calcTotal(arr: Trasaccion[]): number {
    let total: number = 0;
    arr.forEach(element => {
      total = total + element.Tra_Monto;
    });
    return total;
  }

  //Remplaza comillas simples po rcomillas dobles
  spliceQuotes(variable: string): string {
    variable = variable;
    var regex = new RegExp("'", "g");
    var res = variable.replace(regex, "\"");
    return res;
  }

  //Fomrato de fecha
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

  //numero a string aladuendo decimales o 0
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
  repeatOrder() {
    console.log("Repetir orden");
  }
}