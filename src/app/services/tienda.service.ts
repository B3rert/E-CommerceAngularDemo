import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL_API } from "./ApiServer";

@Injectable()
export class TiendaService{


    private url: string;

    constructor(private _http: HttpClient){
        this.url = URL_API.ApiSqlServer.url;
    }

    getTienda(){
        let headers = new HttpHeaders({"Content-Type": "application/json"});

        return this._http.get(this.url + "Tienda",{headers: headers});
    }

}