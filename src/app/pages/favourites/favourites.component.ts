import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Article from '../../models/Articles';
import { PokeitemComponent } from '../../pokeitem/pokeitem.component';
import { PokeApiService } from '../../services/pocket.service';
import { Error } from '../../utils/types';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, PokeitemComponent, ErrorComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {
  isLoaderActive = true;
  isFavouritesEmpty = false;
  favourites: Article[] = []
  isError = false
  error: Error = {}

  constructor(private pokeApi: PokeApiService) {}

  ngOnInit(): void {
      this.pokeApi.getFavouriteArticles().subscribe({
        next: (favouritesList) => {
          this.isLoaderActive = false;
          if(!favouritesList || favouritesList.length == 0) {
            this.isFavouritesEmpty = true
            console.log(this.isFavouritesEmpty)
            return
          }
          this.favourites = favouritesList

        },
        error: (err: HttpErrorResponse) => {
          this.isLoaderActive = false;
          console.warn(err.status);
          this.error.errorCode = err.status
          this.error.errorMessage = err.error["error_message"] || err.statusText
          this.isError = true
        }
      })
  }

}
