import { Component, OnInit } from '@angular/core';
import { PokeAuthService } from '../services/pokeauth.service';

@Component({
    selector: 'app-auth-modal',
    template: `<div class="col-12 d-flex container">
            <img src="../../assets/pocket_logo.png"/>
            <h3>Login Pocket to view your saves Articles</h3>
            <button class="btn btn-success" (click)="authoriseUser()">Login</button>
    </div>`,
    styles: [`.container {     height: 400px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    } img { width: 250px; margin-bottom: 20px;} h3{margin-bottom: 12px}`]
})

export class AuthModalComponent implements OnInit {
    constructor(private auth: PokeAuthService) { }

    ngOnInit() { }

    authoriseUser() {
        this.auth.authoriseUser().subscribe((data) => {
            window.location.href = data.redirectUrl
            // this.router.navigate(["/authorisation"], {queryParams: data})
        })
    }
}