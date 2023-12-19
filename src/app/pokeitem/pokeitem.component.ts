import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import Article from '../models/Articles';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PokeApiService } from '../services/pocket.service';
import { ToastService } from '../services/toast.service';
import { ToastsContainer } from '../toast/toasts-container.component';
import { ImageRenderDirective } from '../utils/imagerender.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokeitem',
  standalone: true,
  imports: [NgbDropdownModule, ToastsContainer, ImageRenderDirective],
  templateUrl: './pokeitem.component.html',
  styleUrl: './pokeitem.component.css'
})
export class PokeitemComponent implements OnInit {
  @Input() item?: Article
  @Output() deletedItem = new EventEmitter()
  @ViewChild("toastTemplate", { static: true })
  template: any; 

  templateContent = "Nothing";

  constructor(
    private apiService: PokeApiService, 
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
      console.log(`poke item`)
      // console.log(this.item)
  }

  deleteArticle(id: any) {
    this.apiService.deleteArticle(id).subscribe({
      next: res => {
        console.log("deleted Successfully")
        this.deletedItem.emit(id)
      },
      error: err => {
        console.error(err)
      }
    })

  }

  archiveArticle(item: Article) {
    let subcriber: Observable<any>
    if(item.status == "0") {
      console.log("archive")
      subcriber = this.apiService.archiveArticle(item.id)
    } else {
      console.log("unarchive")
      subcriber = this.apiService.unarchiveArticle(item.id)
    }
    subcriber.subscribe({
      next: res => {
        item.status = item.status == "1" ? "0" : "1"
        let templateContent = item.status == "1" ? "added to" : "removed from"
        this.toastService.add({content: `Article ${templateContent} archives`, template: this.template, className: 'bg-success text-light'})
      },
      error: err => {
        this.toastService.add({content: `Failed to add or remove from archives`, template: this.template, className: 'bg-danger text-light'})
        console.error(err)
      }

    })
    // this.apiService.archiveArticle(item.id).subscribe({
    //   next: res => {
    //     console.log("deleted Successfully")
    //     console.log(res);
    //     item.status = "1"
    //   },
    //   error: err => {
    //     console.error(err)
    //   }
    // })
  }

  favouriteArticle(item: Article) {
    console.log(item)
    let subcriber: Observable<any>
    if(item.favourite == "0") {
      console.log("favourite")
      subcriber = this.apiService.favouriteArticle(item.id)
    } else {
      console.log("unfavourite")
      subcriber = this.apiService.unfavouriteArticle(item.id)
    }

    subcriber.subscribe({
      next: res => {
        item.favourite = item.favourite == "1" ? "0" : "1"
        let templateContent = item.favourite == "1" ? "added to" : "removed from"
        this.toastService.add({content: `Article ${templateContent} favorites`, template: this.template, className: 'bg-success text-light'})
      },
      error: err => {
        this.toastService.add({content: `Failed to add or remove from favourites`, template: this.template, className: 'bg-danger text-light'})
        console.error(err)
      }

    })
  }
  
}
