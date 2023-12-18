import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs";
import { PokeAuthService } from "../../services/pokeauth.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-authorise',
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./authorise.component.html",
    styleUrl: "./authorise.component.css"
})
export class AuthoriseComponent {
    screen = ""
    constructor(private router: Router, private route: ActivatedRoute, private auth: PokeAuthService) {
        route.queryParams.subscribe((param) => {
            this.screen = param["screen"]
        })
    }

    authoriseUser() {
        this.auth.authoriseUser().subscribe((data) => {
            window.location.href = data.redirectUrl
            // this.router.navigate(["/authorisation"], {queryParams: data})
        })
    }
    authenticate() {
        this.auth.connectWithPocket().subscribe((data) => {
            console.log(data);
            localStorage.removeItem("access_token")
            console.log(data);
            localStorage.setItem("access_token", data["access_token"]);
            this.router.navigate(["/saves"])
            // data.accessToken
        })

    }
}