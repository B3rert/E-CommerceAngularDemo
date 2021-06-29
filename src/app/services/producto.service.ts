import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL_API } from "./ApiServer";

@Injectable()
export class ProductoService {
    private url: string;


    constructor(private _http: HttpClient) {
        this.url = URL_API.ApiSqlServer.url;
    }


    producto(categoria: number) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });

        return this._http.get(this.url + "Producto/" + categoria, { headers: headers });
    }

    getProductoDetalles(producto: number, unidad_medida: number, bodega: number) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });

        return this._http.get(this.url + "presentacionproducto/" + producto + "/" + unidad_medida + "/" + bodega, { headers: headers });
    }

    //int producto, int unidad_medida, int empresa

    getVariasImagenes(producto: number, unidad_medida: number, empresa: number) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });

        return this._http.get(this.url + "imagenesproducto/" + producto + "/" + unidad_medida + "/" + empresa, { headers: headers });
    }

}