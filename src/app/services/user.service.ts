import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL_API } from "./ApiServer";


@Injectable()
export class UserService {

    private url: string;

    constructor(private _http: HttpClient) {
        this.url = URL_API.ApiSqlServer.url;
    }

    postRegitroUser(user: any) {
        let params = JSON.stringify(user);

        let headers = new HttpHeaders({ "Content-Type": "application/json" });

        return this._http.post(this.url + "registrouser", params, { headers: headers });
    }

    posLogin(user_to_login: any) {
        let params = JSON.stringify(user_to_login);

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this._http.post(`${this.url}login`,params, { headers: headers });
    }
}