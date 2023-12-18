import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-error',
    standalone: true,
    templateUrl: './error.component.html'
})

export class ErrorComponent implements OnInit {
    @Input() errorCode = ""
    @Input() errorMessage = ""
    constructor() { }

    ngOnInit() { 
        console.log("error code is " + this.errorCode)
        console.log("error code is " + this.errorMessage)
    }
}