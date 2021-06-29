import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL_API } from "./ApiServer";

@Injectable()
export class CategoriaService{


    private url: string;

    constructor(private _http: HttpClient){
        this.url = URL_API.ApiSqlServer.url;
    }

    categoria(){
        let headers = new HttpHeaders({"Content-Type": "application/json"});

        return this._http.get(this.url + "categoria",{headers: headers});
    }

}