import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokeformComponent } from '../../pokeform/pokeform.component';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from '../../services/pocket.service';
import { PokeitemComponent } from '../../pokeitem/pokeitem.component';
import Article from '../../models/Articles';
import { CommonModule } from '@angular/common';
import { ToastsContainer } from '../../toast/toasts-container.component';

// type Article = {
//   title: string,
//   url: string,
//   domainName: string | null | undefined,
//   imageUrl: string | null,
//   timeToRead: number | null | undefined

// };
@Component({
  selector: 'app-saves',
  standalone: true,
  imports: [CommonModule, PokeitemComponent, ToastsContainer],
  templateUrl: './saves.component.html',
  styleUrl: './saves.component.css'
})
export class SavesComponent implements OnInit {

  isSavesEmpty = false
  isLoaderActive = true;
  saves: Article[] = [] 

  constructor(
    private modalService: NgbModal, 
    private route: ActivatedRoute,
    private pokeApi: PokeApiService
  ){}

  ngOnInit(): void {
    let val = localStorage.getItem("access_token")
    console.log(val)
    this.pokeApi.getArticles().subscribe((savesList) => {
      this.isLoaderActive = false;
      if(!savesList || savesList.length == 0) {
        this.isSavesEmpty = true
        return
      }
      this.saves = savesList
    })
    // .subscribe((data) => {
    //   console.log();
    // })
  }

  deleteListItem(id: string | number) {
    this.saves = this.saves.filter(save => save.id != id)
  }

}

