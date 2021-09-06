import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/**
 * Icons fontawesome
 */
import { faLink, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

import { UserFactura } from 'src/app/models/factura.model';
import { ProductPedidoModel } from 'src/app/models/producto-pedido.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FormaPagoService } from 'src/app/services/forma-pago.services';
import { ProductoService } from 'src/app/services/producto.service';
import { TiendaService } from 'src/app/services/tienda.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { RegistroUser } from 'src/app/models/registro-user.model';
import { GenericAcceptDialogComponent } from '../dialog/generic-accept-dialog/generic-accept-dialog.component';
import { GenericActionsDialogComponent } from '../dialog/generic-actions-dialog/generic-actions-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { UserLogin } from 'src/app/models/user-login.model';
import { RestorePassword } from 'src/app/models/restore-pass.model';

@Component({
  selector: 'app-tienda-tipo',
  templateUrl: './tienda-tipo.component.html',
  styleUrls: ['./tienda-tipo.component.css'],
  providers: [
    TiendaService,
    CategoriaService,
    ProductoService,
    FormaPagoService,
    UserService
  ]
})

export class TiendaTipoComponent implements OnInit {

  //Abrir/Cerrar SideNav
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  @ViewChild('sidenavend')
  sidenavend!: MatSidenav;

  close(reason: string) {
    this.sidenav.close();
    this.sidenavend.close();
  }

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
  faAngleDoubleUp = faAngleDoubleUp;

  //Modelos
  public userFactura: UserFactura;
  public inputRegisterUser: RegistroUser;
  public inputUserLogin: UserLogin;
  public inputRestorePass: RestorePassword;

  //Variables
  tienda_en_linea = true;
  tienda_seleccionada: any;
  tiendas: any;
  categorias: any;
  productos: any;
  forma_pedido: any;
  producto_seleccionado: any;
  detalle_producto = false;
  cantidad_producto = 0;
  pedidos: any[] = [];
  cantidades_varias: any[] = [];
  cantidades_varias_TP: any[] = [];
  collapsedOrNot: boolean[] = [];

  carrito_cantidad = 0;
  categoria_activa = 0;
  carrito_pago = false;
  forma_pago = false;
  presentacion = false;
  presentacion_producto: any;
  formas_pago: any;
  fotos: any;
  indiceSeleccionado = 0;
  fotoSeleccionada = "";
  vPresentaciones: any;
  categorias_padre: any[] = [];
  categorias_hijo: any[] = [];
  producto_exist = true;
  confirmar_pago = false;
  precio_vusuario: string = "0.00";
  no_hay_producto_detalle = false;
  progress_product = true;

  login_modal = false;
  registro_form = false;
  restart_form = false;

  isSesssionLogin = false;
  tokenUser: any = false;

  forma_pago_select: any;

  constructor(
    private _ac: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private _tiendaService: TiendaService,
    private _categoriaService: CategoriaService,
    private _productoService: ProductoService,
    private _formaPagoService: FormaPagoService,
    private _userService: UserService
  ) {
    this.updateDataSession();
    this.getTiendas();
    this.getCategorias();
    this.getProductos(0);
    var fecha_hora = this.getHoraActual();
    this.userFactura = new UserFactura("", "", "", "", "", fecha_hora, "", "", "");
    this.inputRegisterUser = new RegistroUser("", "", "", "");
    this.inputUserLogin = new UserLogin("", "");
    this.inputRestorePass = new RestorePassword("");
  }

  ngOnInit(): void {

    let tienda = sessionStorage.getItem("tienda");
    this.tienda_seleccionada = JSON.parse(tienda!);
    this.forma_pedido = sessionStorage.getItem("FormaPedido");
  }

  contentUp(){
    window.scrollTo(0,0);
  }


  resolveLargeString(text: string) {
    let totalCharacteres = text.length;
    if (totalCharacteres > 70) {
      let cutCharacter = totalCharacteres - 70;
      text = text.slice(0, - cutCharacter);
      text = text.replace(/\s*$/,"");
      text = `${text}...`;
      return text;
    } else {
      return text;
    }
  }

  restorePassword() {
    let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

    if (!this.inputRestorePass.Correo_Electronico) {
      this.dialog.open(GenericAcceptDialogComponent, {
        data: { tittle: "Correo electrónico requerido." }
      });
    } else if (!re.exec(this.inputRestorePass.Correo_Electronico)) {
      this.dialog.open(GenericAcceptDialogComponent, {
        data: { tittle: "Correo electrónico invalido." }
      });
    } else {
      console.log("Restaurar Contraseña Service");
    }
  }

  updateDataSession() {
    this.tokenUser = this._userService.getToken();

    if (this.tokenUser) {
      this.tokenUser = this.tokenUser;
      this.isSesssionLogin = true;
    } else {
      this.tokenUser = false;
      this.isSesssionLogin = false;
    }
  }

  saveMyData = false;
  rememberMe() {
    this.saveMyData ? this.saveMyData = false : this.saveMyData = true;
  }

  progressLogin = false;

  accsesLogin() {
    if (!this.inputUserLogin.user) {
      this.dialog.open(GenericAcceptDialogComponent, {
        data: { tittle: "Usuario requerido." }
      });
    } else if (!this.inputUserLogin.pass) {
      this.dialog.open(GenericAcceptDialogComponent, {
        data: { tittle: "Contraseña requerida." }
      });
    } else {
      this.progressLogin = true;
      this._userService.posLogin(this.inputUserLogin).subscribe(
        res => {

          this.progressLogin = false;

          let token = JSON.parse(JSON.stringify(res)).messege;
          if (JSON.parse(JSON.stringify(res)).res) {
            if (this.saveMyData) {
              //guardar datos en el navegador
              localStorage.setItem("Token", token)
            } else {
              //Guardar datos mientras la sesion esté activa
              sessionStorage.setItem("Token", token);
            }
            this.emptyInputsForms();
            this.cModalLogin();
            this.updateDataSession();
            //console.log(JSON.parse(JSON.stringify(res)).messege);
          } else {
            this.dialog.open(GenericAcceptDialogComponent, {
              data: {
                tittle: "Error al iniciar sesión.",
                description: "Usuario o contraseña incorrecta"
              }
            });
          }
        },
        err => {
          this.progressLogin = false;
          this.dialog.open(GenericAcceptDialogComponent, {
            data: {
              tittle: "Algo Salió mal",
              description: err.message
            }
          });
          console.error(err);
          return;
        }
      );
    }
  }

  regitroUser() {

    let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

    if (!this.inputRegisterUser.Nombre) {
      this.dialog.open(GenericAcceptDialogComponent, {
        data: { tittle: "Nombre requerido." }
      });
    } else if (!this.inputRegisterUser.Apellido) {
      this.dialog.open(GenericAcceptDialogComponent, {
        data: { tittle: "Apellido Requerido." }
      });
    } else if (!this.inputRegisterUser.Celular) {
      this.dialog.open(GenericAcceptDialogComponent, {
        data: { tittle: "Número de teléfono requerido." }
      });
    } else if (!this.inputRegisterUser.Correo_Electronico) {
      this.dialog.open(GenericAcceptDialogComponent, {
        data: { tittle: "Correo electrónico requerido." }
      });
    } else if (!re.exec(this.inputRegisterUser.Correo_Electronico)) {
      this.dialog.open(GenericAcceptDialogComponent, {
        data: { tittle: "Correo electrónico invalido." }
      });
    } else {
      this.progressLogin = true;
      this._userService.postRegitroUser(this.inputRegisterUser).subscribe(
        res => {
          this.progressLogin = false;
          if (res == 0) {
            this.dialog.open(GenericAcceptDialogComponent, {
              data: {
                tittle: "Error al registrar usuario.",
                description: "El correo que ingresó ya se encuentra registrado."
              }
            });
          } else if (res == 1) {
            this.dialog.open(GenericAcceptDialogComponent, {
              data: {
                tittle: "Usuario registrado exitosamente.",
                description: "Sus credenciales han sido enviadas a su correo electrónico."
              }
            });
            this.emptyInputsForms();
          }
        }, err => {
          this.progressLogin = false;
          this.dialog.open(GenericAcceptDialogComponent, {
            data: {
              tittle: "Algo Salió mal",
              description: err.message
            }
          });
          console.error(err);
          return;
        });
    }
  }


  emptyInputsForms() {
    //Limpiar campos login
    this.inputUserLogin.user = "";
    this.inputUserLogin.pass = "";
    //Limpiar campos registro
    this.inputRegisterUser.Nombre = "";
    this.inputRegisterUser.Apellido = "";
    this.inputRegisterUser.Celular = "";
    this.inputRegisterUser.Correo_Electronico = "";
    //limpiar campos recuperar contraseña
    this.inputRestorePass.Correo_Electronico = "";

  }


  alterLogin() {
    if (this.registro_form) {
      this.registro_form = false;
      this.restart_form = false;
      this.emptyInputsForms()
    } else {
      this.restart_form = false;
      this.registro_form = true;
      this.emptyInputsForms()
    }
  }

  alterLoginRestore() {
    if (this.restart_form) {
      this.emptyInputsForms()
      this.restart_form = false;
      this.registro_form = false;
    } else {
      this.restart_form = true;
      this.registro_form = false;
    }
  }

  changeStore() {
    const dialogRef = this.dialog.open(GenericActionsDialogComponent, {
      data: {
        tittle: "¿Cambiar Tienda?",
        description: "Es posible que se pierdan datos que no hayan sido guardados."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/seleccion']);
        return;
      }
    });
  }

  //Controlar DropDown iconos en categorias
  dropCat(index: number) {
    let value = this.collapsedOrNot[index];
    value ? value = false : value = true;
    this.collapsedOrNot[index] = value;
  }

  //categoria Id
  getId(Id: number) {
    return (`categoria${Id}`)
  }

  //Cerrar Modal Login
  cModalLogin() {
    this.emptyInputsForms()

    this.login_modal = false;
    this.registro_form = false;
    this.restart_form = false;
  }

  continuarPago() {
    this.forma_pago = true;
    this.getFormaPago();
  }

  nitcf() {
    if (this.userFactura.Nit == "") {
      this.userFactura.Nit = "C/F";
    }
    else {
      this.userFactura.Nit = "";
    }
  }

  selectTienda(tienda: any) {
    this.tienda_en_linea = true;
    this.tienda_seleccionada = tienda;
  }

  //Cerrar Modal detalle producto
  cdetalle() {
    this.detalle_producto = false;
  }

  menosProducto() {
    if (this.cantidad_producto == 0) {
      this.cantidad_producto = 0;
    } else {
      this.cantidad_producto--;
    }
  }

  getHoraActual() {
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fecha_hora = fecha + ' ' + hora;

    return fecha_hora;
  }

  masProducto() {
    this.cantidad_producto++;
  }

  menosProductoVarios(indice: number) {
    if (this.cantidades_varias_TP.length != 0) {
      if (this.cantidades_varias_TP[indice] == 0) {
        this.cantidades_varias_TP[indice] = 0;
      } else {
        this.cantidades_varias_TP[indice] = this.cantidades_varias_TP[indice] - 1;
      }
    } else {
      if (this.cantidades_varias[indice] == 0) {
        this.cantidades_varias[indice] = 0;
      } else {
        this.cantidades_varias[indice] = this.cantidades_varias[indice] - 1;
      }
    }
  }

  masProductoVarios(indice: number) {
    if (this.cantidades_varias_TP.length != 0) {
      this.cantidades_varias_TP[indice] = this.cantidades_varias_TP[indice] + 1;

    } else {
      this.cantidades_varias[indice] = this.cantidades_varias[indice] + 1;
    }
  }

  addCarrito(producto_seleccionado: any, cantidad: any) {
    let hay_productos = false;
    //verificar que se agregaron productos
    if (this.cantidades_varias.length != 0) {
      for (var item of this.cantidades_varias) {
        if (item != 0) {
          hay_productos = true;
          break;
        }
      }
    }

    if (this.cantidades_varias_TP.length != 0) {
      for (var item of this.cantidades_varias_TP) {
        if (item != 0) {
          hay_productos = true;
          break;
        }
      }
    }

    //Si hay productos agregarlos al carrito
    if (hay_productos) {

      //si son tipos de presentacion
      if (this.cantidades_varias.length != 0) {

        //Obtener precio total productos
        let indice = 0;

        this.cantidades_varias.forEach(element => {
          if (element != 0) {
            let producto_pedido: ProductPedidoModel = new ProductPedidoModel(
              this.presentacion_producto[indice].iD_Producto,
              this.toMayus(this.presentacion_producto[indice].presentacion),
              this.presentacion_producto[indice].descripcion_Alt_Producto,
              producto_seleccionado.url_Img,
              this.presentacion_producto[indice].producto,
              this.presentacion_producto[indice].unidad_Medida,
              this.presentacion_producto[indice].precio_Unidad,
              this.resolverPrecioCantidad(this.presentacion_producto[indice].precio_Unidad, element),
              this.NumberToString(this.resolverPrecioCantidad(this.presentacion_producto[indice].precio_Unidad, element)),
              element,
            );
            this.pedidos.push(producto_pedido);
            this.carrito_cantidad = this.carrito_cantidad + 1;
          }
          indice++;
        });
      }

      //Si son varios tipo precio
      if (this.cantidades_varias_TP.length != 0) {

        //Obtener precio total productos
        let indice = 0;

        this.cantidades_varias_TP.forEach(element => {
          if (element != 0) {
            let producto_pedido: ProductPedidoModel = new ProductPedidoModel(
              this.presentacion_producto[indice].iD_Producto,
              this.toMayus(this.presentacion_producto[indice].descripcion_Alt_Producto + " " + this.presentacion_producto[indice].des_Tipo_Precio),
              this.presentacion_producto[indice].descripcion_Alt_Producto,
              producto_seleccionado.url_Img,
              this.presentacion_producto[indice].producto,
              this.presentacion_producto[indice].unidad_Medida,
              this.presentacion_producto[indice].precio_Unidad,
              this.resolverPrecioCantidad(this.presentacion_producto[indice].precio_Unidad, element),
              this.NumberToString(this.resolverPrecioCantidad(this.presentacion_producto[indice].precio_Unidad, element)),
              element,
            );
            this.pedidos.push(producto_pedido);
            this.carrito_cantidad = this.carrito_cantidad + 1;
          }
          indice++;
        });
      }
    }

    //Actualizar Total
    this.actualizarTotal();
    //cerrar Modal
    this.cdetalle();
    //Limpiar cantidades
    this.cantidades_varias_TP.splice(0, this.cantidades_varias_TP.length);
    this.cantidades_varias.splice(0, this.cantidades_varias.length);
  }

  actualizarTotal() {
    let total_final = 0;
    this.pedidos.forEach(element => {
      total_final = total_final + element.precio_cantidad;
    });
    this.precio_vusuario = this.NumberToString(total_final);
  }

  toMayus(cadena: string) {
    return cadena.toUpperCase();
  }

  resolverPrecioCantidad(precio_Unidad: number, cantidad: number) {
    return precio_Unidad * cantidad;
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

  realizarPago() {
    this.carrito_pago = true;
  }

  regresarCarrito() {
    this.carrito_pago = false;
    this.forma_pago = false;
  }

  regresarFormulario() {
    this.forma_pago = false;
    this.confirmar_pago = false;
  }

  eliminarProducto(indice: number) {
    this.pedidos.splice(indice, 1);
    this.carrito_cantidad = this.carrito_cantidad - 1;
    this.actualizarTotal()
  }

  limpiarCarrito() {
    this.pedidos.splice(0, this.pedidos.length);
    this.carrito_cantidad = 0;
    this.precio_vusuario = "0.00"
  }

  restarProducto(cantidad: number, indice: number) {

    if (this.pedidos[indice].cantidad == 1) {
      this.pedidos.splice(indice, 1);
      this.carrito_cantidad = this.carrito_cantidad - 1;
      this.actualizarTotal()
    } else {
      this.pedidos[indice].cantidad = cantidad - 1;

      let nuevo_total = this.pedidos[indice].precio_cantidad - this.pedidos[indice].precio_unidad;
      this.pedidos[indice].precio_cantidad = nuevo_total;
      this.pedidos[indice].precio_cantidad_string = this.NumberToString(nuevo_total);

      this.actualizarTotal()
    }

  }

  sumarProducto(cantidad: number, indice: number) {
    this.pedidos[indice].cantidad = cantidad + 1;
    let nuevo_total = this.pedidos[indice].precio_cantidad + this.pedidos[indice].precio_unidad;
    this.pedidos[indice].precio_cantidad = nuevo_total;
    this.pedidos[indice].precio_cantidad_string = this.NumberToString(nuevo_total);
    this.actualizarTotal()
  }

  login() {
    //verificar si el usuario ya inició sesion
    //Si sí irá a la configuracion de la ciuenta
    //sino mostrar modal login

    if (!this.isSesssionLogin) {
      this.login_modal = true;
    } else {
      this.router.navigate(['/pedido']);
    }

  }

  productoDetalle(producto_seleccionado: any) {
    this.detalle_producto = true;
    this.producto_seleccionado = producto_seleccionado;

    this._productoService.getVariasImagenes(
      producto_seleccionado.producto,
      producto_seleccionado.unidad_Medida,
      1).subscribe(
        res => {

          let resJson = JSON.stringify(res);
          this.fotos = JSON.parse(resJson);
        },
        err => {
          alert("Error de servidor.")
          console.log(err)
        }
      );
    //Verificar si el producto tiene variantes

    this._productoService.getProductoDetalles(producto_seleccionado.producto, producto_seleccionado.unidad_Medida,this.tienda_seleccionada.bodega).subscribe(
      res => {
        let resJson = JSON.stringify(res);
        this.presentacion_producto = JSON.parse(resJson);

        if (this.presentacion_producto.length == 0) {
          this.no_hay_producto_detalle = true;

        } else {
          this.no_hay_producto_detalle = false;
          if (!this.presentacion_producto[0].variantes) {
            this.presentacion = false
            for (let index = 0; index < this.presentacion_producto.length; index++) {
              this.cantidades_varias_TP[index] = 0;

            }
          } else {
            this.presentacion = true;

            for (let index = 0; index < this.presentacion_producto.length; index++) {
              this.cantidades_varias[index] = 0;
            }
          }
        }
      },
      err => {
        alert("Error de servidor.")
        console.log(err)
      }
    );
  }

  seleccionarImagen(indice: number) {
    this.indiceSeleccionado = indice;
    this.fotoSeleccionada = this.fotos[this.indiceSeleccionado].url_Img;
  }

  resolverFoto(indice: any) {
    if (this.fotos.length == 0) {
      return ("assets/img/image-not-found.png");
    } else {
      if (this.fotos[indice].url_Img) {
        return this.fotos[indice].url_Img;
      } else {
        return ("assets/img/image-not-found.png");
      }
    }
  }

  getTiendas() {
    this._tiendaService.getTienda().subscribe(
      res => {
        let resJson = JSON.stringify(res);
        this.tiendas = JSON.parse(resJson);
      },
      err => {
        alert("Error de servidor");
        console.log(err);
      }
    );
  }

  filtrarCategorias_hijo(padres: any) {
    let hijos: any = [];
    this.categorias_hijo.forEach(cHijo => {
      if (padres.categoria == cHijo.categoria_Padre) {
        hijos.push(cHijo);
      }
    });

    return hijos;
  }

  getCategorias() {

    let categoriasSession = sessionStorage.getItem("categorias")

    if (categoriasSession) {
      this.categorias = JSON.parse(categoriasSession);
      this.categorias.forEach((element: { categoria_Padre: any; }) => {
        let categoriaPadre = JSON.stringify(element.categoria_Padre);
        if (categoriaPadre == '{}') {
          this.categorias_padre.push(element);
          this.collapsedOrNot.push(true);
        } else {
          this.categorias_hijo.push(element);
        }
      });
        
    }else{
      this._categoriaService.categoria().subscribe(
        res => {
          let resJson = JSON.stringify(res);
          sessionStorage.setItem("categorias",resJson);
          this.categorias = JSON.parse(resJson);
          this.categorias.forEach((element: { categoria_Padre: any; }) => {
            let categoriaPadre = JSON.stringify(element.categoria_Padre);
            if (categoriaPadre == '{}') {
              this.categorias_padre.push(element);
              this.collapsedOrNot.push(true);
            } else {
              this.categorias_hijo.push(element);
            }
          });
  
        },
        err => {
          alert("Error de servidor");
          console.log(err);
        }
      );

    }


    
  }

  tipoPagoLlave(formaPagoSelect: any) {
    this.confirmar_pago = true;
    this.forma_pago_select = formaPagoSelect;
  }

  getProductos(categoria: number) {
    this.progress_product = true;
    this.categoria_activa = categoria;
    this._productoService.producto(categoria).subscribe(
      res => {
        let resJson = JSON.stringify(res);
        this.productos = JSON.parse(resJson);

        if (this.productos.length == 0) {
          this.producto_exist = false;
          this.progress_product = false;

        } else {
          this.progress_product = false;

          this.producto_exist = true;
        }
      },
      err => {
        alert("Error de servidor");
        console.log(err);
        this.progress_product = false;

      }
    );
  }

  getFormaPago() {
    this._formaPagoService.getFormaPago(
      this.tienda_seleccionada.tipo_Documento,
      this.tienda_seleccionada.serie_Documento,
      this.tienda_seleccionada.empresa/*
      46, "1", 1*/
    ).subscribe(
      res => {
        let resJson = JSON.stringify(res);
        this.formas_pago = JSON.parse(resJson);
      },
      err => {
        alert("Error de servidor");
        console.log(err);
      }
    );
  }
}


