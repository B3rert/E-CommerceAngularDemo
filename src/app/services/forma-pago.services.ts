import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL_API } from "./ApiServer";

@Injectable()
export class FormaPagoService {


    private url: string;

    constructor(private _http: HttpClient) {
        this.url = URL_API.ApiSqlServer.url;
    }

    getFormaPago(tipo_documento: number, serie_documento: string, empresa: number) {
        let headers = new HttpHeaders({ "Content-Type": "application/json" });

        return this._http.get(this.url + "formapago/" + tipo_documento + "/" + serie_documento + "/" + empresa, { headers: headers });
    }

}