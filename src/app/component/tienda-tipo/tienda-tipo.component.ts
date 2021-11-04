import { Component, OnInit, ViewChild, Pipe } from '@angular/core';
import { Router } from '@angular/router';
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
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
/***/
import * as $ from 'jquery';
/** */
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
import { SerachBar } from 'src/app/models/search.models';
import { NavItem } from 'src/app/interfaces/nav-item.interface';
import { PedidoService } from 'src/app/services/pedido.service';
import { DocumentoEstructura, PedidoEstructura, Trasaccion } from 'src/app/interfaces/documento-estructura.interface'
import { Pedido } from 'src/app/interfaces/pedido.interface';
import { PictureProduct } from 'src/app/interfaces/picture-product.interface';
import { CuentaCorrentista } from 'src/app/services/cuenta-correntista.service';
import { OptionDialogComponent } from '../dialog/option-dialog/option-dialog.component';
import { DataUser, DatosEntrega, DatosFactura, DatosPersonales } from 'src/app/interfaces/forms-order.service';
import { Product } from 'src/app/interfaces/producto.interface';
import { PresentacionProduto } from 'src/app/interfaces/prentacion.interface';
import { CargoAbono } from 'src/app/interfaces/tipo-cargo-abono.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OptionMultipleDialogComponent } from '../dialog/option-multiple-dialog/option-multiple-dialog.component';

@Component({
  selector: 'app-tienda-tipo',
  templateUrl: './tienda-tipo.component.html',
  styleUrls: ['./tienda-tipo.component.css'],
  providers: [
    TiendaService,
    CategoriaService,
    ProductoService,
    FormaPagoService,
    UserService,
    PedidoService,
    CuentaCorrentista
  ]
})

export class TiendaTipoComponent implements OnInit {

  error_input: string = "Algun error";
  payments: FormGroup;

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  //Abrir/Cerrar SideNav
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  @ViewChild('sidenavend')
  sidenavend!: MatSidenav;
  /***/
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
  faFilter = faFilter;
  faCaretRight = faCaretRight;
  faEllipsisV = faEllipsisV;
  faShippingFast = faShippingFast;
  faClock = faClock;
  faCartArrowDown = faCartArrowDown;
  faInfoCircle = faInfoCircle;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faEdit = faEdit;
  //Modelos
  public userFactura: UserFactura;
  public inputRegisterUser: RegistroUser;
  public inputUserLogin: UserLogin;
  public inputRestorePass: RestorePassword;
  public inputSearchBar: SerachBar;

  //Variables
  tienda_en_linea = true;
  tienda_seleccionada: any;
  categorias: any;
  productos: Product[] = [];
  forma_pedido: any;
  producto_seleccionado: Product = {
    "producto_Id": "",
    "descripcion": "",
    "descripcion_Alt": "",
    "url_Img": "",
    "producto": 0,
    "unidad_Medida": 0,
    "des_Unidad_Medida": ""
  };
  detalle_producto = false;
  cantidad_producto = 0;
  pedidos: any[] = [];
  cantidades_varias: any[] = [];
  cantidades_varias_TP: any[] = [];
  collapsedOrNot: boolean[] = [];
  navItems: NavItem[] = [];

  carrito_cantidad = 0;
  categoria_activa = 0;
  carrito_pago = false;
  forma_pago = false;
  presentacion = false;
  confirmar_pago = false;

  presentacion_producto: PresentacionProduto[] = [];
  formas_pago: CargoAbono[] = [];
  fotos: PictureProduct[] = [];
  indiceSeleccionado = 0;
  fotoSeleccionada = "";
  vPresentaciones: any;
  producto_exist = true;

  precio_vusuario: string = "0.00";
  amount_paid: string = "0.00";
  remainingBalance: string = "0.00";
  subtotal_pago: any;
  error_message = {
    "disabled": true,
    "key": "none",
    "error": false,
    "message": ""
  };

  no_hay_producto_detalle = false;
  progress_product = true;
  products_autocomplete: any;
  login_modal = false;
  registro_form = false;
  restart_form = false;
  isSesssionLogin = false;
  tokenUser: any = false;
  forma_pago_select: any;
  progressLogin = false;
  saveMyData = false;
  elemento_asignado: number = 0;
  tipo_pedidos: any;
  tipo_pedido_seleccionado: any;
  isCheckedNit = false;
  progress_forma_pago = false;
  progress_detalle = false;
  multiPayments = false;
  multipaymentsInput = false;
  addPayment = false;

  favoriteSeason: string = "Descripción";
  seasons: string[] = ['Descripción', 'SKU'];
  nombre_user = "Nombre usuario"
  srcActive = 0;
  srcCategorias: any[] = [{ "name": "Todas", "categoria": 0 }];

  datos_personales: DatosPersonales = {
    "nombre": "",
    "apellido": "",
    "correo_electronico": "",
    "telefono": "",
    "tlefono_alt": ""
  };
  datos_factura: DatosFactura = {
    "nombre": "",
    "direccion": "",
    "nit": ""
  };
  datos_entrega: DatosEntrega = {
    "ciudad": "",
    "direccion_entrega": "",
    "fecha_recoger": "",
    "observacion": ""
  };
  datos_usuario: DataUser = {
    "datos_personales": this.datos_personales,
    "datos_factura": this.datos_factura,
    "datos_entrega": this.datos_entrega,
    "user_name": this.nombre_user,
    "checked": this.checked
  }

  jsonPayments = {};
  inputsPayments: any[] = [];
  paymentsAmount: any[] = [];
  finallyPayments: any[] = [];

  constructor(

    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private _categoriaService: CategoriaService,
    private _productoService: ProductoService,
    private _formaPagoService: FormaPagoService,
    private _userService: UserService,
    private _pedidoService: PedidoService,
    private _cuentaCorrentistaService: CuentaCorrentista,
  ) {

    this.payments = fb.group({});

    var fecha_hora = this.getHoraActual();
    this.userFactura = new UserFactura("", "", "", "", "", fecha_hora, "", "", "");
    this.inputRegisterUser = new RegistroUser("", "", "", "");
    this.inputUserLogin = new UserLogin("", "");
    this.inputRestorePass = new RestorePassword("");
    this.inputSearchBar = new SerachBar("");
    window.addEventListener('scroll', this.scrollEvent, true);
  }


  showScrollHeight = 400;
  hideScrollHeight = 200;
  showGoUpButton = false;


  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  ngOnInit(): void {


    this.updateDataSession();
    this.getCategorias();
    this.getProductos(0);
    this.products_autocomplete = JSON.parse(sessionStorage.getItem("productos")!);

    let tienda = sessionStorage.getItem("tienda");
    this.tienda_seleccionada = JSON.parse(tienda!);
    this.tipo_pedidos = JSON.parse(sessionStorage.getItem("tipoPedidos")!);
    this.updateElementoAsignado();
    this.asignarTipoPedido();
    //this.getAndViewOrderLocal();
  }

  //crear json multiples formas de pago
  createMultiPaymentsJson(formas_pago: CargoAbono[]) {

    formas_pago.forEach(element => {
      this.jsonPayments = Object.assign(this.jsonPayments, { [element.descripcion]: false });
    });
  }

  confirmarMonto() {
    console.log("confirmarMonto");
  }

  getDataUser() {

    let datos_personales = <DataUser>JSON.parse(localStorage.getItem("datos_personales")!);
    if (datos_personales) {
      this._userService.getUserNameToken(this.tokenUser).subscribe(
        res => {
          this.nombre_user = JSON.parse(JSON.stringify(res)).messege;
          if (datos_personales.user_name == this.nombre_user) {
            this.datos_personales.nombre = datos_personales.datos_personales.nombre;
            this.datos_personales.apellido = datos_personales.datos_personales.apellido;
            this.datos_personales.telefono = datos_personales.datos_personales.telefono;
            this.datos_personales.tlefono_alt = datos_personales.datos_personales.tlefono_alt;
            this.datos_personales.correo_electronico = datos_personales.datos_personales.correo_electronico;
            this.datos_factura.nombre = datos_personales.datos_factura.nombre;
            this.datos_factura.nit = datos_personales.datos_factura.nit;
            this.datos_factura.direccion = datos_personales.datos_factura.direccion;
            this.datos_entrega.ciudad = datos_personales.datos_entrega.ciudad;
            this.datos_entrega.direccion_entrega = datos_personales.datos_entrega.direccion_entrega;
            this.datos_entrega.fecha_recoger = datos_personales.datos_entrega.fecha_recoger;
            this.datos_entrega.observacion = datos_personales.datos_entrega.observacion;
            this.checked = datos_personales.checked;
          }
        },
        err => {
          alert("Error al recuperar datos de compra");
          console.error(err);
        });
    }
  }

  updateElementoAsignado() {
    this.elemento_asignado = + sessionStorage.getItem("elemento_asignado")!;
  };
  //categorias, generar estructura arból
  generateMenuCat() {
    let children: NavItem[] = [];
    let pather: NavItem[] = [];

    this.categorias.forEach((element: any) => {
      if (element.nivel == 1) {
        let item = {
          displayName: element.descripcion,
          categoria: element.categoria,
          categoria_Padre: element.categoria_Padre,
          nivel: element.nivel,
          children: []
        }
        pather.push(item);
      } else {
        let item = {
          displayName: element.descripcion,
          categoria: element.categoria,
          categoria_Padre: element.categoria_Padre,
          nivel: element.nivel,
          children: []
        }
        children.push(item);
      }
    });
    this.childrenGenerate(pather, children)
  }

  //Añade los hijos correspondientes a cada padre o hijo
  childrenGenerate(padre: any[], hijo: any[]) {
    padre.forEach(element => {
      hijo.forEach(elementChildren => {
        if (element.categoria == elementChildren.categoria_Padre) {
          if (!element.children.includes(elementChildren)) {
            element.children?.push(elementChildren);
          }
          this.childrenGenerate(element.children, hijo);
        }
      });
    });
    this.navItems = padre;
  }



  //Se activa cuando hay algun cambio en la barra de busqueda 
  //filtrando los resultados que encuentre
  valuechange() {
    this.progress_product = true;
    let arr: Product[] = [];
    arr = <Product[]>JSON.parse(sessionStorage.getItem("productos")!);
    let resfilter = this.transform(arr, this.inputSearchBar.element);
    this.productos = resfilter;
    if (resfilter.length == 0) {
      this.producto_exist = false;
    } else {
      this.producto_exist = true;
    }
    this.progress_product = false;
  }

  @Pipe({
    name: 'filtros'
  })

  private data: any;

  //returna un arrgelo con los elemntos que coincidan con la entrada en el filtro
  transform(arreglo: Product[], texto: string): Product[] {

    if (texto === '') {
      return arreglo;
    }
    texto = texto.toLocaleLowerCase();
    if (this.favoriteSeason == "Descripción") {
      return arreglo.filter(item => {
        this.data = item.descripcion.toLowerCase().includes(texto);
        return this.data;
      });
    } else if (this.favoriteSeason == "SKU") {
      return arreglo.filter(item => {
        this.data = item.producto_Id.toLowerCase().includes(texto);
        return this.data;
      });
    } else {
      return arreglo;
    }
  }

  searchProducts() {
    //submit
  }

  //Ecuchando scroll en todos los elementos
  scrollEvent = (event: any): void => {
    const number = event.srcElement.scrollTop;
    if (event.srcElement.className == "container_main") {
      if (number > this.showScrollHeight) {
        this.showGoUpButton = true;
      } else if (number < this.hideScrollHeight) {
        this.showGoUpButton = false;
      }
    }

    if (event.srcElement.className == "container_main"
      || event.srcElement.className == "container_start"
      || event.srcElement.className == "toolbarCateg") {
      if (number != 0) {
        $('.toolbarCateg').slideUp(180);
        $('.col_categorias_nav').height('calc(100vh - 230px)');

      } else if (number < 1) {
        $('.toolbarCateg').slideDown(180);
        $('.col_categorias_nav').height('calc(100vh - 270px)');
      }
    }
  }

  //subir contenido
  contentUp() {
    // document.querySelector(".container_main")!.scrollTop = 0;
    $('.container_main').animate({ scrollTop: (0) }, 2000);
  }

  //Acortar un texto a 73 caracteres donde los ultimos 3 son puntos(...)
  resolveLargeString(text: string) {
    let totalCharacteres = text.length;
    if (totalCharacteres > 70) {
      let cutCharacter = totalCharacteres - 70;
      text = text.slice(0, - cutCharacter);
      text = text.replace(/\s*$/, "");
      text = `${text}...`;
      return text;
    } else {
      return text;
    }
  }

  //Restaurar contraseña
  restorePassword() {
    let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if (!this.inputRestorePass.correo) {
      this.dialog.open(GenericAcceptDialogComponent, {
        data: { tittle: "Correo electrónico requerido." }
      });
    } else if (!re.exec(this.inputRestorePass.correo)) {
      this.dialog.open(GenericAcceptDialogComponent, {
        data: { tittle: "Correo electrónico invalido." }
      });
    } else {
      this.progressLogin = true;
      this._userService.putRestorePass(this.inputRestorePass).subscribe(
        res => {
          this.progressLogin = false;
          switch (res) {
            case 0:
              this.dialog.open(GenericAcceptDialogComponent, {
                data: {
                  tittle: "Algo salió mal",
                  description: `El correo ${this.inputRestorePass.correo} no está registrado.`
                }
              });
              break;
            case 1:
              this.dialog.open(GenericAcceptDialogComponent, {
                data: {
                  tittle: "Contraseña restaurada correctamente",
                  description: `Se ha enviado su nueva contraseña al correo ${this.inputRestorePass.correo}`
                }
              });
              this.cModalLogin();
              break;
            default:
              this.dialog.open(GenericAcceptDialogComponent, {
                data: {
                  tittle: "Error",
                  description: "Algo Salió mal, intentelo más tarde."
                }
              });
              console.error(res);
              break;
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
        });
    }
  }

  //Actualiza los datos del usuario en caso de una sesion permanente o cierre de sesión
  updateDataSession() {
    this.tokenUser = this._userService.getToken();
    if (this.tokenUser) {
      this.tokenUser = this.tokenUser;
      this.isSesssionLogin = true;
      this.getUserName(this.tokenUser);
      this.getAndViewOrderLocal();
      this.getDataUser();
    } else {
      this.tokenUser = false;
      this.isSesssionLogin = false;
    }
  }

  //Permanencia de la sesión
  rememberMe() {
    this.saveMyData ? this.saveMyData = false : this.saveMyData = true;
  }

  //Iniciar sesión
  accsesLogin() {
    if (!this.inputUserLogin.user) {
      this.dialogAccept("Usuario requerido.");
    } else if (!this.inputUserLogin.pass) {
      this.dialogAccept("Contraseña requerida.");
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

  //Registro nuevo usuario 
  regitroUser() {
    let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if (!this.inputRegisterUser.Nombre) {
      this.dialogAccept("Nombre requerido.");
    } else if (!this.inputRegisterUser.Apellido) {
      this.dialogAccept("Apellido Requerido.");
    } else if (!this.inputRegisterUser.Celular) {
      this.dialogAccept("Número de teléfono requerido.");
    } else if (!this.inputRegisterUser.Correo_Electronico) {
      this.dialogAccept("Correo electrónico requerido.");
    } else if (!re.exec(this.inputRegisterUser.Correo_Electronico)) {
      this.dialogAccept("Correo electrónico invalido.");
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

  //Limpiar campos de los formularios del usuario 
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
    this.inputRestorePass.correo = "";
  }

  //Cambiar entre los formularios inicio/registro/restaurar
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

  //Cambiar entre los formularios inicio/registro/restaurar
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

  //Cambiar tienda
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

  //cambiar a formulario para hacer el pago 
  continuarPago() {

    let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

    if (!this.datos_personales.nombre) {
      this.dialogAccept("Nombre requerido en datos personales.");
    } else if (!this.datos_personales.telefono) {
      this.dialogAccept("Télefono requerido en datos personales.");
    } else if (!this.datos_personales.correo_electronico) {
      this.dialogAccept("Correo electrónico requerido en datos personales.");
    } else if (!re.exec(this.datos_personales.correo_electronico)) {
      this.dialogAccept("Correo electrónico invalido en datos personales.")
    } else if (!this.datos_factura.nit) {
      this.dialogAccept("NIT requerido en datos de facturación.");
    } else if (!this.datos_factura.nombre) {
      this.dialogAccept("Nombre requerido en datos para la factura");
    } else if (!this.datos_factura.direccion) {
      this.dialogAccept("Dirección requerida en datos de facturación.");
    } else if (!this.datos_entrega.ciudad) {
      this.dialogAccept("Ciudad requerida en datos de entrega.");
    } else {

      if (this.checked) {
        this.datos_usuario.user_name = this.nombre_user;
        this.datos_usuario.checked = this.checked;
        localStorage.setItem("datos_personales", JSON.stringify(this.datos_usuario));
      } else {
        localStorage.removeItem("datos_personales");
      }

      this.forma_pago = true;
      this.getFormaPago();


    }
  }

  //Dialogo con un texto y un boton de aceptar
  dialogAccept(dialog: string) {
    this.dialog.open(GenericAcceptDialogComponent, {
      data: {
        tittle: dialog,
      }
    });
  }

  //Agregar consumidor final
  nitcf() {
    if (!this.isCheckedNit) {
      this.datos_factura.nit = "C/F"
      this.datos_factura.nombre = "Consumidor Final"
      this.datos_factura.direccion = "Ciudad"
    }
    else {
      this.datos_factura.nit = "";
      this.datos_factura.nombre = "";
      this.datos_factura.direccion = "";
    }
  }

  //Obtener tienda seleccionada 
  selectTienda(tienda: any) {
    this.tienda_en_linea = true;
    this.tienda_seleccionada = tienda;
  }

  //Cerrar Modal detalle producto
  cdetalle() {
    this.detalle_producto = false;
  }

  //Descripcion producto, restar cantidad producto
  menosProducto() {
    if (this.cantidad_producto == 0) {
      this.cantidad_producto = 0;
    } else {
      this.cantidad_producto--;
    }
  }

  //Descripcion producto, sumar cantidad producto
  masProducto() {
    this.cantidad_producto++;
  }

  //Obtiene la hora actual del dispositivo
  getHoraActual() {
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fecha_hora = fecha + ' ' + hora;
    return fecha_hora;
  }

  //Restar cantidad producto en el carrito
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

  //Sumar cantidad producto en el carrito
  masProductoVarios(indice: number) {
    if (this.cantidades_varias_TP.length != 0) {
      this.cantidades_varias_TP[indice] = this.cantidades_varias_TP[indice] + 1;
    } else {
      this.cantidades_varias[indice] = this.cantidades_varias[indice] + 1;
    }
  }

  saveOrderLocal() {
    let pedidoUp: Pedido = {
      pedido: this.pedidos,
      user: this.nombre_user,
      tienda_pedido: this.tienda_seleccionada,
      tipo_pedido: this.elemento_asignado
    }
    localStorage.setItem("pedidoLocal", JSON.stringify(pedidoUp));
  }

  async getAndViewOrderLocal() {
    if (this.isSesssionLogin) {
      let pedido = JSON.parse(localStorage.getItem("pedidoLocal")!);
      if (pedido.pedido.length != 0) {
        await this._userService.getUserNameToken(this.tokenUser).subscribe(
          async res => {
            let user = JSON.parse(JSON.stringify(res));
            if (pedido.user == user.messege) {
              let tienda_pedido = JSON.parse(JSON.stringify(pedido.tienda_pedido));

              if (tienda_pedido.bodega == this.tienda_seleccionada.bodega) {
                this.pedidos = pedido.pedido;
                this.actualizarTotal();
                this.carrito_cantidad = this.pedidos.length;

              } else {
                const dialogRef = this.dialog.open(GenericActionsDialogComponent, {
                  data: {
                    tittle: "¿Cambiar Tienda?",
                    description: "Se ha encontrado un pedido pendiente de procesar, pero la tienda del pedido pendiente no coincide con la tienda seleccionada en la sesion acrual. Si decide mantener la tienda actual, el pedido se perderá.",
                    verdadero: "Mantener tienda del pedido encontrado.",
                    falso: "Mantener tienda actual"
                  }
                });
                dialogRef.afterClosed().subscribe(result => {
                  if (result) {

                    /**
                     * let tienda = sessionStorage.getItem("tienda");
                      this.tienda_seleccionada = JSON.parse(tienda!);
                     */
                    sessionStorage.setItem("tienda", JSON.stringify(tienda_pedido));
                    this.ngOnInit();
                  }
                });

              }


              if (pedido.tipo_pedido != this.elemento_asignado) {

                let descElAsigActual = await this.descElementoAsignado(this.elemento_asignado);
                let descElAsigPedido = await this.descElementoAsignado(pedido.tipo_pedido)

                const dialogRef = this.dialog.open(GenericActionsDialogComponent, {
                  data: {
                    tittle: "¿Cambiar tipo de pedido?",
                    description: `Se ha encontrado un pedido pendiente de procesar, el pedido encontrado está configurado para ser ${descElAsigPedido}, pero en la sesion actual ha seleccionado ${descElAsigActual}, puede cambiar o mantener esta configuración.`,
                    verdadero: descElAsigPedido,
                    falso: descElAsigActual
                  }
                });
                dialogRef.afterClosed().subscribe(async result => {
                  if (result) {
                    sessionStorage.setItem("elemento_asignado", pedido.tipo_pedido.toString());
                    await this.updateElementoAsignado();
                    await this.asignarTipoPedido();
                  } else {
                    sessionStorage.setItem("elemento_asignado", this.elemento_asignado.toString());
                    await this.updateElementoAsignado();
                    await this.asignarTipoPedido();
                  }
                });
              }
            }
          }, err => {
            console.log(err);
          }
        );
      }
    }
  }


  //Retorna la desripcion del elemento asignado
  descElementoAsignado(elemento_asignado: number) {
    let descripcion = "tipo_pedido"
    this.tipo_pedidos.forEach((element: any) => {
      if (element.elemento_Asignado == elemento_asignado) {
        descripcion = element.descripcion;
      }
    });
    return descripcion;
  }


  //Añadir productos al carrito
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
              this.presentacion_producto[indice].moneda,
              this.presentacion_producto[indice].tipo_Precio,
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
              this.presentacion_producto[indice].moneda,
              this.presentacion_producto[indice].tipo_Precio,
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

  //Actualiza el total del pedido
  actualizarTotal() {
    let total_final = 0;
    this.pedidos.forEach(element => {
      total_final = total_final + element.precio_cantidad;
    });
    this.precio_vusuario = this.NumberToString(total_final);

    if (this.nombre_user != "Nombre usuario") {
      this.saveOrderLocal();
    }
  }

  //Convierte una cadena dada a MAYUSCULAS
  toMayus(cadena: string) {
    return cadena.toUpperCase();
  }

  //Obtiene el total de las cantidades * el precio unitario del producto
  resolverPrecioCantidad(precio_Unidad: number, cantidad: number) {
    return precio_Unidad * cantidad;
  }

  //Transforma numeros a string agregando 2 decimales para mostrar al usuario
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

  //Cambiar a formulario pago 
  realizarPago() {
    this.carrito_pago = true;
  }
  regresarFormaPago() {
    this.confirmar_pago = false;
    this.forma_pago = true;
  }

  //regresar al carrito
  regresarCarrito() {
    this.carrito_pago = false;
    this.forma_pago = false;
  }

  //regresa al formulario de datos del usuario (Facturacion)
  regresarFormulario() {
    this.forma_pago = false;
    this.confirmar_pago = false;
  }

  //Quita un producto del carrito 
  eliminarProducto(indice: number) {
    this.pedidos.splice(indice, 1);
    this.carrito_cantidad = this.carrito_cantidad - 1;
    this.actualizarTotal()
  }

  //Quita todos los productos añadidos al carrito, con alerta
  limpiarCarrito() {
    const dialogRef = this.dialog.open(GenericActionsDialogComponent, {
      data: {
        tittle: "¿Vaciar Carrito?",
        description: "Es posible que se pierdan datos que no hayan sido guardados."
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vaciarPedido();
      }
    });
  }

  //Quita todos los productos aladidos al carrito
  vaciarPedido() {
    this.pedidos.splice(0, this.pedidos.length);
    this.carrito_cantidad = 0;
    this.precio_vusuario = "0.00"
    this.saveOrderLocal();
  }

  //Quita una unidad a la cantidad de un producto añadido
  //si el producto solo tiene una unidad se elimina el producto del carrito
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

  //Añade una unidad a la cantidad del producto
  sumarProducto(cantidad: number, indice: number) {
    this.pedidos[indice].cantidad = cantidad + 1;
    let nuevo_total = this.pedidos[indice].precio_cantidad + this.pedidos[indice].precio_unidad;
    this.pedidos[indice].precio_cantidad = nuevo_total;
    this.pedidos[indice].precio_cantidad_string = this.NumberToString(nuevo_total);
    this.actualizarTotal()
  }

  //verificar si el usuario ya inició sesion
  //Si sí irá a la configuracion de la ciuenta
  //sino mostrar modal login
  login() {
    if (!this.isSesssionLogin) {
      this.login_modal = true;
    } else {
      if (this.pedidos.length == 0) {
        this.router.navigate(['/pedido', false]);
      } else {
        this.router.navigate(['/pedido', true]);
      }
    }
  }


  //Convierte una imagen dada en base64 la gurada en imageBase64
  async getPicturesProduct(producto: number, unidad_medida: number, empresa: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._productoService.getVariasImagenes(
        producto,
        unidad_medida,
        empresa).subscribe(
          res => {
            this.fotos = <PictureProduct[]>res;
            resolve();
          },
          err => {
            resolve();
            console.log(err)
            alert("Error de servidor.")
          }
        );
    });
  }


  //Obtiene y muestra el detalle de un producto
  async productoDetalle(producto_seleccionado: Product) {

    this.progress_detalle = true;
    this.detalle_producto = true;
    this.producto_seleccionado = producto_seleccionado;

    await this.getPicturesProduct(producto_seleccionado.producto, producto_seleccionado.unidad_Medida, this.tienda_seleccionada.empresa);

    //Verificar si el producto tiene variantes
    this._productoService.getProductoDetalles(
      producto_seleccionado.producto, producto_seleccionado.unidad_Medida,
      this.tienda_seleccionada.bodega).subscribe(
        res => {
          this.presentacion_producto = <PresentacionProduto[]>res;

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
          this.progress_detalle = false;

        },
        err => {
          this.progress_detalle = false;

          alert("Error de servidor.")
          console.log(err)
        }
      );
  }

  //Cambiar imagen al visualizar imagenes en el detalle del producto
  seleccionarImagen(indice: number) {
    this.indiceSeleccionado = indice;
    this.fotoSeleccionada = this.fotos[this.indiceSeleccionado].url_Img;
  }

  //Remplaza una imagen por defecto en caso de que no hayan imagenes que mostrar
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

  //Obtiene las categorias
  getCategorias() {
    let categoriasSession = sessionStorage.getItem("categorias")

    if (categoriasSession) {
      this.categorias = JSON.parse(categoriasSession);
      this.generateMenuCat();

    } else {
      this._categoriaService.categoria().subscribe(
        res => {
          let resJson = JSON.stringify(res);
          sessionStorage.setItem("categorias", resJson);
          this.categorias = JSON.parse(resJson);
          this.generateMenuCat();
        },
        err => {
          alert("Error de servidor");
          console.log(err);
        }
      );
    }
  }

  //Obtiene la forma de pago seleccionada por el usuario
  tipoPagoLlave(formaPagoSelect: any) {
    this.confirmar_pago = true;

    this.finallyPayments = [];

    let item = {
      descripcion: formaPagoSelect.descripcion,
      monto: this.precio_vusuario
    }

    this.finallyPayments.push(item);

    this.forma_pago_select = formaPagoSelect;
  }


  tipoPagoMultiple() {

    this.remainingBalance = this.precio_vusuario;

    //this.confirmar_pago = true;
    this.inputsPayments = [];
    for (var key in this.payments.value) {
      // Controlando que json realmente tenga esa propiedad
      if (this.payments.value.hasOwnProperty(key)) {
        // Mostrando en pantalla la clave junto a su valor
        //  console.log( `${key} is ${this.payments.value[key]}`);

        if (this.payments.value[key]) {
          let item = {
            forma_pago: key,
            value: null,
            disabled: false
          }
          this.inputsPayments.push(item);
        }
      }
    }
    //console.log(this.payments.value);

    if (this.inputsPayments.length == 0) {
      this.dialogAccept("Selecciona al menos una forma de pago.");
    } else if (this.inputsPayments.length == 1) {

      this.inputsPayments.forEach(forma_pago_select => {
        this.formas_pago.forEach(formas_pago => {
          if (forma_pago_select.forma_pago == formas_pago.descripcion) {
            this.tipoPagoLlave(formas_pago);
          }
        });
      });

    } else {

      let options: string[] = [];

      //Add payments not selected in options
      this.formas_pago.forEach(formas_pago => {
        let existe = false;
        this.inputsPayments.forEach(inputsPayments => {
          if (inputsPayments.forma_pago == formas_pago.descripcion) {
            existe = true;
          }
        });
        if (!existe) {
          options.push(formas_pago.descripcion);
        }
      });


      if (options.length == 0) {
        this.addPayment = false;
      } else {
        this.addPayment = true;
      }

      this.multipaymentsInput = true;

    }

  }


  updateAddPayment() {
    let options: string[] = [];

    //Add payments not selected in options
    this.formas_pago.forEach(formas_pago => {
      let existe = false;
      this.inputsPayments.forEach(inputsPayments => {
        if (inputsPayments.forma_pago == formas_pago.descripcion) {
          existe = true;
        }
      });
      if (!existe) {
        options.push(formas_pago.descripcion);
      }
    });


    if (options.length == 0) {
      this.addPayment = false;
    } else {
      this.addPayment = true;
    }

  }

  deleteFormaPago(key: any) {

    const dialogRef = this.dialog.open(GenericActionsDialogComponent, {
      data: {
        tittle: "¿Eliminar forma de pago?"
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {

        if (this.inputsPayments[key].disabled) {
          this.remainingBalance = this.NumberToString(this.convertToNumber(this.remainingBalance) + this.convertToNumber(this.inputsPayments[key].value));
          this.amount_paid = this.NumberToString(this.convertToNumber(this.amount_paid) - this.convertToNumber(this.inputsPayments[key].value));
        }

        this.inputsPayments.splice(key, 1);

        if (this.inputsPayments.length == 1) {
          this.inputsPayments.forEach(forma_pago_select => {
            this.formas_pago.forEach(formas_pago => {
              if (forma_pago_select.forma_pago == formas_pago.descripcion) {
                this.tipoPagoLlave(formas_pago);
                this.multipaymentsInput = false;
              }
            });
          });
        }
        this.updateAddPayment();
      }
    });
  }


  addFormaPago() {

    let options: string[] = [];

    //Add payments not selected in options
    this.formas_pago.forEach(formas_pago => {
      let existe = false;
      this.inputsPayments.forEach(inputsPayments => {
        if (inputsPayments.forma_pago == formas_pago.descripcion) {
          existe = true;
        }
      });
      if (!existe) {
        options.push(formas_pago.descripcion);
      }
    });

    const dialogRef = this.dialog.open(OptionMultipleDialogComponent, {
      data: {
        tittle: "¿Agregar forma de pago?",
        verdadero: "Agregar",
        options: options
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        let payments_dialog = JSON.parse(sessionStorage.getItem("payments_dialog")!);

        for (var key in payments_dialog) {
          // Controlando que json realmente tenga esa propiedad
          if (payments_dialog.hasOwnProperty(key)) {
            // Mostrando en pantalla la clave junto a su valor
            //  console.log( `${key} is ${this.payments.value[key]}`);

            if (payments_dialog[key]) {
              let item = {
                forma_pago: key,
                value: null,
                disabled: false
              }
              this.inputsPayments.push(item);
            }
          }
        }

        this.updateAddPayment();
        sessionStorage.removeItem("payments_dialog");
      }
    });
  }

  //Convert string to number
  convertToNumber(value: string) {
    return +value;
  }

  returnPayment() {
    this.multipaymentsInput = false;
  }


  //Show error on input payment
  showError(key: any, amount: any) {
    let amount_str = 0;
    isNaN(this.convertToNumber(amount)) ? amount_str = 0 : amount_str = this.convertToNumber(amount);

    //Invalid number negative and zero and string values in amount_str
    if (amount_str <= 0 || isNaN(amount_str)) {
      this.error_message =
      {
        "disabled": false,
        "key": key,
        "error": true,
        "message": "El monto debe ser mayor a cero y no contener texto."
      };

    } else {

      //ivalid mount greater than remaining balance
      if (amount_str > this.convertToNumber(this.remainingBalance)) {
        this.error_message = {
          "disabled": false,
          "key": key,
          "error": true,
          "message": "El monto debe ser menor o igual al monto por abonar."
        };

      } else {
        this.error_message = {
          "disabled": false,
          "key": key,
          "error": false,
          "message": "Monto valido."
        };
      }
    }
  }


  editAmount(key: any, amount: any) {
    this.inputsPayments.forEach(element => {
      if (key == element.forma_pago) {
        element.disabled = false;
        element.value = null;
      }
    });

    this.remainingBalance = this.NumberToString(this.convertToNumber(this.remainingBalance) + this.convertToNumber(amount));
    this.amount_paid = this.NumberToString(this.convertToNumber(this.amount_paid) - this.convertToNumber(amount));

  }

  confirmAmount(key: any, amount: any) {

    let amount_str = 0;
    isNaN(this.convertToNumber(amount)) ? amount_str = 0 : amount_str = this.convertToNumber(amount);

    //Invalid number negative and zero and string values in amount_str
    if (amount_str <= 0 || isNaN(amount_str)) {
      console.log("Invalid number negative and zero and string values in amount");
    } else {

      //ivalid mount greater than remaining balance
      if (amount_str > this.convertToNumber(this.remainingBalance)) {
        console.log("Invalid mount greater than remaining balance");
      } else {
        this.inputsPayments.forEach(element => {
          if (key == element.forma_pago) {
            element.value = this.NumberToString(amount_str);
            element.disabled = true;
          }
        });

        this.remainingBalance = this.NumberToString(this.convertToNumber(this.remainingBalance) - amount_str);
        this.amount_paid = this.NumberToString(this.convertToNumber(this.amount_paid) + amount_str);

      }

    }
  }

  continuePayment() {
    let montos_confirmados = true;;

    for (let index = 0; index < this.inputsPayments.length; index++) {
      if (!this.inputsPayments[index].disabled) {
        this.dialogAccept("Por favor confirme todos los montos.");
        console.log("Por favor confirme todos los montos.");
        montos_confirmados = false;
        break; // este bucle for no sigue iterando
      }
    }

    if (montos_confirmados) {


      if (this.convertToNumber(this.remainingBalance) != 0) {
        this.dialogAccept("No se ha pagado el monto total.");
        console.log("No se ha pagado el saldo total.");

      } else {
        console.log("Pago completado.");
        this.confirmar_pago = true;

        this.finallyPayments = [];

        this.inputsPayments.forEach(inputsPayments => {
          let item = {
            descripcion: inputsPayments.forma_pago,
            monto: inputsPayments.value
          }

          this.finallyPayments.push(item);
        });


      }


    }

  }

  //delete space from string and return new string
  deleteSpace(string: string) {
    return string.replace(/\s/g, "");
  }


  //Al hacer click en una categoria hijo se activa la categoria padre
  searchCategoriaPadre(categoria: number) {
    this.categorias.forEach((element: any) => {
      if (element.categoria == categoria) {
        if (element.nivel != 1) {
          this.searchCategoriaPadre(element.categoria_Padre);
          let item = {
            "name": this.transformCapitalize(element.descripcion),
            "categoria": element.categoria
          }
          this.srcCategorias.push(item);
        } else {
          this.categoria_activa = element.categoria;
          let item = {
            "name": this.transformCapitalize(element.descripcion),
            "categoria": element.categoria
          }
          this.srcCategorias.push(item);
        }
      }
    });
  }

  //Transforma la primera letra de un texto en Mayuscula
  transformCapitalize(text: string) {
    text = text.toLocaleLowerCase();
    function capitalizarPrimeraLetra(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return capitalizarPrimeraLetra(text);
  }

  //Obtiene las categorias según una categoría
  getProductos(categoria: number) {
    //Funciona mas lento si se guarda en session storage patra evitar las llamadas http
    this.progress_product = true;
    this.srcActive = categoria;
    if (categoria != 0) {
      this.srcCategorias.splice(0, this.srcCategorias.length);
      this.searchCategoriaPadre(categoria);
    } else {
      this.categoria_activa = categoria;
      this.srcCategorias.splice(0, this.srcCategorias.length);
      this.srcCategorias.push({ "name": "Todas", "categoria": 0 })
    }

    this._productoService.producto(categoria).subscribe(
      res => {

        this.productos = <Product[]>res;
        sessionStorage.setItem("productos", JSON.stringify(this.productos));

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

  async getFormaPago(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.progress_forma_pago = true;
      this._formaPagoService.getFormaPago(
        this.tienda_seleccionada.tipo_Documento,
        this.tienda_seleccionada.serie_Documento,
        this.tienda_seleccionada.empresa/*
        46, "1", 1*/
      ).subscribe(
        res => {
          this.progress_forma_pago = false;
          this.formas_pago = <CargoAbono[]>res;
          this.createMultiPaymentsJson(this.formas_pago);
          this.payments = this.fb.group(this.jsonPayments);
          resolve();
        },
        err => {
          console.log(err);
          this.progress_forma_pago = false;
          resolve();
          alert("Error de servidor");
        }
      );
    });
  }



  //Obtiene el nombre del usuario loggeado
  getUserName(token: any): any {
    this._userService.getUserNameToken(token).subscribe(
      res => {
        this.nombre_user = JSON.parse(JSON.stringify(res)).messege;
      },
      err => {
        console.error(err);
      });
  }

  //registrar Documento Estructura
  sendPedido(status: number) {
    let transacciones: Trasaccion[] = [];

    this.pedidos.forEach(element => {

      let item: Trasaccion = {
        "Tra_Bodega": this.tienda_seleccionada.bodega,
        "Tra_Producto": element.producto,
        "Tra_Unidad_Medida": element.unidad_Medida,
        "Tra_Cantidad": element.cantidad,
        "Tra_Monto": element.precio_cantidad,
        "Tra_Tipo_Cambio": 7.700000,
        "Tra_Moneda": element.moneda,
        "Tra_Tipo_Precio": element.tipo_Precio,
        "Tra_Factor_Conversion": null,
        "Tra_Descripcion": element.descripcion,
        "Tra_Imagen": element.url_Img,
      }
      transacciones.push(item);
    });

    let estructuraPedido: PedidoEstructura = {
      "Doc_Tipo_Documento": this.tienda_seleccionada.tipo_Documento,
      "Doc_Serie_Documento": this.tienda_seleccionada.serie_Documento,
      "Doc_Empresa": this.tienda_seleccionada.empresa,
      "Doc_Estacion_Trabajo": this.tienda_seleccionada.estacion_Trabajo,
      "Doc_UserName": this.nombre_user,
      //"Doc_Nombre": `${this.datos_personales.nombre} ${this.datos_personales.apellido}`,
      "Doc_Nombre": this.datos_factura.nombre,
      "Doc_NIT": this.datos_factura.nit,
      "Doc_Direccion": this.datos_factura.direccion,
      "Doc_Referencia": null,
      "Doc_Observacion_1": this.datos_entrega.observacion,
      "Doc_Tipo_Pago": 1,
      "Doc_Elemento_Asignado":this.elemento_asignado,
      "Doc_Tienda_Seleccionada":this.tienda_seleccionada,
      "Tra": transacciones
    };

    let docEstructura: DocumentoEstructura = {
      pEstructura: JSON.stringify(estructuraPedido),
      pUserName: this.nombre_user,
      pTipo_Estructura: 1,
      pEstado: status,
      pM_UserName: null
    };

    //Consumo del api
    this._pedidoService.postDocumentoEstructura(docEstructura).subscribe(
      res => {
        let resOk = JSON.parse(JSON.stringify(res))
        this.dialog.open(GenericAcceptDialogComponent, {
          data: {
            tittle: "Su pedido ha sido recibido.",
            description: `Puede consultar el estado de su pedido con el identificador: ${resOk.consecutivo_interno}`
          }
        });
        //!carrito_pago && !forma_pago && !confirmar_pago forma_pago && !confirmar_pago
        this.vaciarPedido();
        this.regresarFormulario();
        this.regresarCarrito();
      },
      err => {
        this.dialog.open(GenericAcceptDialogComponent, {
          data: {
            tittle: "Algo Salió mal",
            description: err.message
          }
        });
        console.error(err);
      }
    );
  }

  //Cambiar tipo del pedido (a domicilio, reco0ger en tienda, etc)
  cambiarTipoPedido() {
    const dialogRef = this.dialog.open(OptionDialogComponent, {
      data: {
        tittle: "¿Cambiar tipo pedido?",
        description: "Selecciona el tipo de pedido que deseas realizar.",
        options: this.tipo_pedidos
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateElementoAsignado();
        this.asignarTipoPedido();
      }
    });
  }


  //Guardar pedido sin confirmar
  saveLastOrder() {
    const dialogRef = this.dialog.open(GenericActionsDialogComponent, {
      data: {
        tittle: "¿Guardar pedido?",
        description: "El pedido se guardará para que pueda continuarlo más tarde, consulte su pedido en la sección Mis pedidos."
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sendPedido(1);
      }
    });
  }

  //Descargar Orden en carrito (En desuso)
  downloadOrder() {
    const dialogRef = this.dialog.open(GenericActionsDialogComponent, {
      data: {
        tittle: "¿Obtener pedido?",
        description: "El pedido se cargará en el carrito para que pueda continuarlo."
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Guardar pedido");
      }
    });
  }

  //Obtener datos por Nit 
  getDataNit() {

    if (!this.datos_factura.nit) {
      this.dialogAccept("Nit requerido");
    } else {
      this._cuentaCorrentistaService.getCuentaCorrentistaNit(this.tokenUser, this.datos_factura.nit).subscribe(
        res => {
          let datos_nit = JSON.parse(JSON.stringify(res));
          if (datos_nit.length == 0) {
            this.dialogAccept("El NIT ingresado no se encuntra registrado en nuestro sistema.");
          } else {
            this.datos_factura.nombre = datos_nit[0].factura_Nombre;
            this.datos_factura.direccion = datos_nit[0].factura_Direccion;
            //console.log(datos_nit[0]);
          }
        },
        err => {
          this.dialogAccept("Algo salió mal, intenta más tarde.");
          console.error(err.messege);

        }
      );
    }
  }

  //Mustra el tipo de pedido 
  asignarTipoPedido() {
    this.tipo_pedidos.forEach((element: any) => {
      if (element.elemento_Asignado == this.elemento_asignado) {
        this.tipo_pedido_seleccionado = element;
      }
    });

    switch (this.elemento_asignado) {
      case 2:
        this.forma_pedido = "domicilio";
        break;
      case 3:
        this.forma_pedido = "recoger"
        break;
      default:
        this.forma_pedido = "domicilio";
        break;
    }
  }
}