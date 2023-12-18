import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import Article from '../models/Articles';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PokeApiService } from '../services/pocket.service';
import { ToastService } from '../services/toast.service';
import { ToastsContainer } from '../toast/toasts-container.component';
import { ImageRenderDirective } from '../utils/imagerender.directive';

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
    this.apiService.archiveArticle(item.id).subscribe({
      next: res => {
        console.log("deleted Successfully")
        console.log(res);
        item.status = "1"
      },
      error: err => {
        console.error(err)
      }
    })
  }

  favouriteArticle(item: Article) {
    this.apiService.favouriteArticle(item.id).subscribe({
      next: res => {
        console.log("deleted Successfully")
        console.log(res);
        item.favourite = "1"
        this.templateContent = "Article added to favorites"
        this.toastService.add({content: "Article added to favorites", template: this.template, className: 'bg-success text-light'})
      },
      error: err => {
        console.error(err)
      }
    })
  }
  
}
