import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Article from '../../models/Articles';
import { PokeitemComponent } from '../../pokeitem/pokeitem.component';
import { PokeApiService } from '../../services/pocket.service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, PokeitemComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {
  isLoaderActive = true;
  isFavouritesEmpty = false;
  favourites: Article[] = []

  constructor(private pokeApi: PokeApiService) {}

  ngOnInit(): void {
      // this.pokeApi.getFavouriteArticles().subscribe(favouritesList => {
      //   this.isLoaderActive = false;
      //   if(!favouritesList || favouritesList.length == 0) {
      //     this.isFavouritesEmpty = true
      //     console.log(this.isFavouritesEmpty)
      //     return
      //   }
      //   this.favourites = favouritesList
      // })

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
        error: (err) => {
          this.isLoaderActive = false;
          console.warn(err.status);
          
        }
      })
  }

}
