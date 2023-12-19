import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/pocket.service';
import Article from '../../models/Articles';
import { CommonModule } from '@angular/common';
import { PokeitemComponent } from '../../pokeitem/pokeitem.component';
import { Error } from '../../utils/types';
import { ErrorComponent } from '../error/error.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-archived',
  standalone: true,
  imports: [CommonModule, PokeitemComponent, ErrorComponent],
  templateUrl: './archived.component.html',
  styleUrl: './archived.component.css'
})
export class ArchivedComponent implements OnInit {

  archives: Article[] = []
  isArchivesEmpty = false
  isLoaderActive = true
  isError = false
  error: Error = {}

  constructor(private pokeApi: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApi.getArchivedArticles().subscribe({
      next: (archivedList) => {
          this.isLoaderActive = false;
          if(!archivedList || archivedList.length == 0) {
            this.isArchivesEmpty = true
            return
          }
          this.archives = archivedList
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
