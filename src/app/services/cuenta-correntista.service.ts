import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL_API } from "./ApiServer";

@Injectable()
export class CuentaCorrentista {

    private url: string;

    constructor(private _http: HttpClient) {
        this.url = URL_API.ApiSqlServer.url;
    }

    getCuentaCorrentistaNit(token:any, nit:string){
        let headers = new HttpHeaders({ "Content-Type": "application/json", "Authorization": `Bearer ${token}` });
        return this._http.get(`${this.url}CuentaCorrentista/${nit}`, { headers: headers });
    }
}