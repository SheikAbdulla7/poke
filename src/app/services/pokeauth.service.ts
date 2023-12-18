import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NetworkConfig } from "./network.service";
import { Observable, map } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class PokeAuthService {
    constructor(private http: HttpClient, private config: NetworkConfig) {}

    authoriseUser() {
        return this.http.post<{redirectUrl : string}>(
            `${this.config.url}/authoriseuser`, 
            null, 
            this.config.options
        )
    }

    connectWithPocket() {
        return this.http.post<{[key: string] : string}>(
            `${this.config.url}/authorise`,
            null,
            this.config.options
        ).pipe(map(data => {
            console.log(`Data is`);
            console.log(data)
            return data;
        }))
    }
}