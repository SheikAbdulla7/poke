import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/pocket.service';
import Article from '../../models/Articles';
import { CommonModule } from '@angular/common';
import { PokeitemComponent } from '../../pokeitem/pokeitem.component';

@Component({
  selector: 'app-archived',
  standalone: true,
  imports: [CommonModule, PokeitemComponent],
  templateUrl: './archived.component.html',
  styleUrl: './archived.component.css'
})
export class ArchivedComponent implements OnInit {

  archives: Article[] = []
  isArchivesEmpty = false
  isLoaderActive = true

  constructor(private pokeApi: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApi.getArchivedArticles().subscribe((archivedList) => {
        this.isLoaderActive = false;
        if(!archivedList || archivedList.length == 0) {
          this.isArchivesEmpty = true
          return
        }
        this.archives = archivedList
    })
  }
}
