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

  pedidos: TipoPedido[] = [
    {
      "elemento_Asignado": 2,
      "descripcion": "Entrega a domicilio",
      "observacion_1": "n/a",
      "imagen_EA": "https://i.pinimg.com/originals/2e/f2/f3/2ef2f3289430a49cfbd483bf44dd2f17.jpg"
    },
    {
      "elemento_Asignado": 3,
      "descripcion": "Recoger en tienda",
      "observacion_1": "n/a",
      "imagen_EA": "https://us.123rf.com/450wm/giamportone/giamportone1711/giamportone171100008/89588302-ubicaci%C3%B3n-icono-naranja-vector.jpg?ver=6"
    }
  ]

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

    sessionStorage.setItem("elemento_asignado", elemento_Asignado.toString());
    this.router.navigate(['/seleccion']);
  }

  getTipoPedido() {
    this.progress_tipo_pedido = true;
    let tipo_pedido_string = JSON.stringify(this.pedidos);
    sessionStorage.setItem("tipoPedidos", tipo_pedido_string);
    let tipo_pedido: TipoPedido[] = <TipoPedido[]>JSON.parse(tipo_pedido_string);

    if (tipo_pedido.length == 1) {
      this.navTipoPedido(tipo_pedido[0].elemento_Asignado);
    } else {
      let items: TipoPedido[] = [];

      tipo_pedido.forEach(element => {

        if (items.length == 2) {
          items.splice(0, items.length);
        } else if (items.length == 1) {
          items.push(element);
          let itemPush = {
            "item": items
          }
          this.lista_tipos_pedidos.push(itemPush);
        } else {
          items.push(element);
        }
      });
    }

    this.progress_tipo_pedido = false;
  }
}