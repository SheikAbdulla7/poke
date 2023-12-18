import { inject } from "@angular/core"
import { PokeAuthService } from "./pokeauth.service"
import { Router } from "@angular/router"

export const authGuard = () : any => {
    
    const router = inject(Router)

    if(localStorage.getItem("access_token")) {
        return true
    }
    return router.navigate(["/authorisation"], {queryParams: {"screen": "login"}})

}