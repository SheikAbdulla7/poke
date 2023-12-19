import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject } from "rxjs/internal/Subject";
import Article from "../models/Articles";

@Injectable({providedIn: 'root'})
export class DataService {
    private subject = new Subject<any>();
 
    sendData(data: Article) {
        this.subject.next(data);
    }
 
    clearData() {
        this.subject.next("");
    }
 
    getData(): Observable<any> {
        return this.subject.asObservable();
    }

    // I have been working
    // I am working on
}