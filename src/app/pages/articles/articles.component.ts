import { Component, OnInit } from '@angular/core';
import { PokeitemComponent } from '../../pokeitem/pokeitem.component';
import { CommonModule } from '@angular/common';
import Article from '../../models/Articles';
import { Error } from '../../utils/types';
import { ErrorComponent } from '../error/error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { PokeApiService } from '../../services/pocket.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, PokeitemComponent, ErrorComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit{
  articles: Article[] = []
  isArticlesEmpty = false
  isLoaderActive = true
  isError = false
  error: Error = {}

  constructor(private pokeApi: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApi.getArticlesOnly().subscribe({
      next: (articleList) => {
        this.isLoaderActive = false;
        if(!articleList || articleList.length == 0) {
          this.isArticlesEmpty = true
          console.log(this.isArticlesEmpty)
          return
        }
        this.articles = articleList

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
