import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';

/**
 * Icons fontawesome
 */
 import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
 import {faSearch} from '@fortawesome/free-solid-svg-icons';
 import {faTimes} from '@fortawesome/free-solid-svg-icons';
 import {faPlus} from '@fortawesome/free-solid-svg-icons';
 import {faMinus} from '@fortawesome/free-solid-svg-icons';
 import {faUser} from '@fortawesome/free-solid-svg-icons';
 import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
 import {faBars} from '@fortawesome/free-solid-svg-icons';


import { UserFactura } from 'src/app/models/factura.model';
import { PedidoModel } from 'src/app/models/pedido.model';
import { ProductPedidoModel } from 'src/app/models/producto-pedido.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FormaPagoService } from 'src/app/services/forma-pago.services';
import { ProductoService } from 'src/app/services/producto.service';
import { TiendaService } from 'src/app/services/tienda.service';
import { MatDialog } from '@angular/material/dialog';

import { MatSidenav } from '@angular/material/sidenav';

//import {N} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tienda-tipo',
  templateUrl: './tienda-tipo.component.html',
  styleUrls: ['./tienda-tipo.component.css'],
  providers: [
    TiendaService,
    CategoriaService,
    ProductoService,
    FormaPagoService
  ]
})
export class TiendaTipoComponent implements OnInit {

  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  @ViewChild('sidenavend')
  sidenavend!: MatSidenav;

  close(reason: string) {
   
    this.sidenav.close();
    this.sidenavend.close();
  }
  //iconos
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;
  faSearch = faSearch;
  faTimes = faTimes;
  faPlus = faPlus;
  faMinus = faMinus;
  faUser = faUser;
  faBars = faBars;


  //Modelos
  //public productoPedido: ProductPedidoModel;
  //public pedido: PedidoModel;

  /*
    this.productoPedido = new ProductPedidoModel("", "", "", "", 0);
    this.pedido = new PedidoModel(this.productoPedido); */



  //models
  public userFactura: UserFactura;

  //variables
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

  login_modal = false;
  login_form = true;
  registro_form = false;

  forma_pago_select: any;

  constructor(
    // private modal: NgbMd
    private _ac: ActivatedRoute,
    private dialog:MatDialog,
    private _tiendaService: TiendaService,
    private _categoriaService: CategoriaService,
    private _productoService: ProductoService,
    private _formaPagoService: FormaPagoService
  ) {

    this.getTiendas();
    this.getCategorias();
    this.getProductos(0);


    var fecha_hora = this.getHoraActual();


    this.userFactura = new UserFactura("", "", "", "", "", fecha_hora, "", "", "");
  }

  ngOnInit(): void {
    this._ac.paramMap.subscribe(paramas => {

      //Parametros recibidos domicilio, recojer 
      this.forma_pedido = paramas.get('forma_pedido');
      let tienda =  sessionStorage.getItem("tienda");
      this.tienda_seleccionada = JSON.parse(tienda!);
     // console.log(this.tienda_seleccionada);

    });
  }

  cModalLogin(){
    this.login_modal = false;
  }
  registroUser(){
    if(this.registro_form){
      this.registro_form = false;
    }else{
      this.registro_form = true;
    }
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
    //alert("Meno productos");


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
    //alert("Mas producto");

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

    console.log(this.pedidos);

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
      let numeros = numero.toString().split(".",2)

      if (numeros[1].length == 1) {
        return numero.toString()+"0"
      }else{
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

  login(){
   //this.dialog.open(LoginDialogComponentComponent);
   this.login_modal = true;
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

    this._productoService.getProductoDetalles(producto_seleccionado.producto, producto_seleccionado.unidad_Medida, 3/*this.tienda_seleccionada.bodega*/).subscribe(
      res => {

        let resJson = JSON.stringify(res);
        this.presentacion_producto = JSON.parse(resJson);

        if (this.presentacion_producto.length == 0) {
          this.no_hay_producto_detalle  = true;

        } else {
          this.no_hay_producto_detalle  = false;
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
    this._categoriaService.categoria().subscribe(
      res => {

        let resJson = JSON.stringify(res);
        this.categorias = JSON.parse(resJson);


        this.categorias.forEach((element: { categoria_Padre: any; }) => {


          let categoriaPadre = JSON.stringify(element.categoria_Padre);

          if (categoriaPadre == '{}') {
            this.categorias_padre.push(element);    
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

  tipoPagoLlave(formaPagoSelect: any) {
    this.confirmar_pago = true;
    this.forma_pago_select = formaPagoSelect;
  }

  getProductos(categoria: number) {
    this.categoria_activa = categoria;
    this._productoService.producto(categoria).subscribe(
      res => {
        let resJson = JSON.stringify(res);
        this.productos = JSON.parse(resJson);

        if (this.productos.length == 0) {
          this.producto_exist = false;
        } else {
          this.producto_exist = true;
        }

      },
      err => {
        alert("Error de servidor");
        console.log(err);
      }
    );
  }

  getFormaPago() {
    this._formaPagoService.getFormaPago(/*
      this.tienda_seleccionada.tipo_Documento,
      this.tienda_seleccionada.serie_Documento,
      this.tienda_seleccionada.empresa*/
      46, "1", 1
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