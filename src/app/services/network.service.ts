import { Injectable } from "@angular/core";


@Injectable({providedIn: "root"})
export class NetworkConfig {
    private _url = "http://localhost:3000"
    get url() : string{
        return this._url;
    }

    private _option = {
        headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "application/json",
        }
    }

    get options() {
        return this._option;
    }

    private _body = {
        access_token: localStorage.getItem("access_token")
    }

    get body() {
        return this._body
    }

    
}