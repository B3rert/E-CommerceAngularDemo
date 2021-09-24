import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { TipoPedido, ListaTipoPedido } from 'src/app/interfaces/tipo-pedido.interface';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  providers: [PedidoService]
})
export class TiendaComponent implements OnInit {

  progress_tipo_pedido = false;
  lista_tipos_pedidos: ListaTipoPedido[] = [];

  constructor(
    private router: Router,
    private _pedidoService: PedidoService
  ) {
    this.getTipoPedido();
  }

  ngOnInit(): void {
  }

  navTipoPedido(elemento_Asignado: any) {
    sessionStorage.setItem("elemento_asignado",elemento_Asignado.toString());
    switch (elemento_Asignado) {
      case 2:
        this.navEntregar();
        break;
      case 3:
        this.navRecoger();
        break;
      default:
        this.navEntregar();
        break;
    }
  }

  navRecoger() {
    sessionStorage.setItem("FormaPedido", "recoger");
    this.router.navigate(['/seleccion']);
  }

  navEntregar() {
    sessionStorage.setItem("FormaPedido", "domicilio");
    this.router.navigate(['/seleccion']);
  }

  getTipoPedido() {
    this.progress_tipo_pedido = true;
    this._pedidoService.getTipoPedidos().subscribe(
      res => {
        
        let tipo_pedido_string = JSON.stringify(res);
        sessionStorage.setItem("tipoPedidos",tipo_pedido_string);
        let tipo_pedido = JSON.parse(tipo_pedido_string);

        let items: TipoPedido[] = [];

        tipo_pedido.forEach((element: any) => {

          let item: TipoPedido = {
            "elemento_Asignado": element.elemento_Asignado,
            "descripcion": element.descripcion,
            "observacion_1": element.observacion_1,
            "imagen_EA": element.imagen_EA
          }

          if (items.length == 2) {
            items.splice(0, items.length);
          } else if (items.length == 1) {
            items.push(item);
            let itemPush = {
              "item": items
            }
            this.lista_tipos_pedidos.push(itemPush);
          } else {
            items.push(item);
          }
        });

        this.progress_tipo_pedido = false;
      },
      err => {
        this.progress_tipo_pedido = false;
        alert("Error de servidor");
        console.error(err);
      }
    );
  }
}