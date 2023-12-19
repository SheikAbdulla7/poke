import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { CustomvalidatorService } from '../services/customvalidator.service';
import { PokeApiService } from '../services/pocket.service';
import Article from '../models/Articles';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-pokeform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pokeform.component.html',
  styleUrl: './pokeform.component.css'
})
export class PokeformComponent {
  modal = inject(NgbActiveModal);
  // private formGroup: FormGroup
  pokeForm = this.formBuilder.group({
    url: ['', [Validators.required, this.customValidator.urlValidator()]],
    title: '',
    // description: ['', Validators.required]
  });

  submitted = false;

  // pokeForm = new FormGroup({
  //   title: new FormControl(''),
  //   url: new FormControl(''),
  //   description: new FormControl('')
  // })

  get pokeFormControl() {
    return this.pokeForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder, 
    private customValidator: CustomvalidatorService, 
    private pokeApi: PokeApiService,
    private dataService: DataService,
    private toastService: ToastService
  ) {}

  onSubmit() {
    this.submitted = true;
    // this.pokeForm.statusChanges.subscribe( (some) => {
      
    // })
    if(this.pokeForm.valid) {
      console.table(this.pokeForm.value);
      let article: {url: string, title?: string} = {
        url: this.pokeForm.controls.url.value!,
        title: this.pokeFormControl.title.value || undefined 
      }
      console.log("hello")
      this.pokeApi.addArticles(article).subscribe({
        next: (article) => {
          this.dataService.sendData(article)
          this.toastService.add({content: "Article added successfully", className: "bg-success text-light"})
          this.modal.close()
        },
        error: (err) => {
          console.log(err)
          this.toastService.add({content: "Failed to add article", className: "bg-danger text-light"})
        }
      })
    }

  }

}
