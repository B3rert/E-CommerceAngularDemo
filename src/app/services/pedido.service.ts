import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL_API } from "./ApiServer";

@Injectable()
export class PedidoService {

    private url: string;

    constructor(private _http: HttpClient) {
        this.url = URL_API.ApiSqlServer.url;
    }

    postDocumentoEstructura(pedido: any) {
        let params = JSON.stringify(pedido);

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this._http.post(`${this.url}pedidos`, params, { headers: headers });
    }

    getDocumentoEstructuraUser(token: any, user: string) {
        let headers = new HttpHeaders({ "Content-Type": "application/json", "Authorization": `Bearer ${token}` });
        return this._http.get(`${this.url}pedidos/${user}`, { headers: headers });
    }

    getTipoPedidos() {
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this._http.get(`${this.url}Pedidos/tipo`, { headers: headers });
    }

    getEstados(token:any){
        let headers = new HttpHeaders({ "Content-Type": "application/json", "Authorization": `Bearer ${token}` });
        return this._http.get(`${this.url}Pedidos/estados`, { headers: headers });
    }
}