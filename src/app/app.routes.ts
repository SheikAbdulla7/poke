import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SavesContainerComponent } from './pages/saves/savescontainer.component'
import { SavesComponent } from './pages/saves/saves.component';
import { AuthoriseComponent } from './pages/authorise/authorise.component';
import { ArchivedComponent } from './pages/archived/archived.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { UnderDevelopmentComponent } from './pages/development/under-development.component';
import { PageNotFoundComponent } from './pages/error/not-found.component';
import { authGuard } from './services/auth.guard';
import { ArticlesComponent } from './pages/articles/articles.component';

export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "authorisation", component: AuthoriseComponent, data: {hideHeader: true}},
    {path: "under-development", component: UnderDevelopmentComponent},
    {path: "saves", component: SavesContainerComponent, children: [
        {
            path: "",
            component: SavesComponent,
            canActivate: [authGuard]
            // outlet: "saves"
        },
        {
            path: "archived", 
            component: ArchivedComponent,
            canActivate: [authGuard]
            // outlet: "saves"
        },
        {
            path: "favourites",
            component: FavouritesComponent,
            canActivate: [authGuard]
            // outlet: "saves"
        },
        {
            path: "articles",
            component: ArticlesComponent,
            canActivate: [authGuard]
            // outlet: "saves"
        }
    ]},
    {path: "**", component: PageNotFoundComponent}
];
