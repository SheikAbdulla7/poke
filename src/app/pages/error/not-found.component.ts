import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-found',
    template: `<div class="d-flex flex-column align-items-center">
        <h2>404 - Page Not Found</h2>
        <p>We couldn't find that page! Not even with x-ray vision.</p>
    </div>`
})

export class PageNotFoundComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}