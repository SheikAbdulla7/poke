import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { CustomvalidatorService } from '../services/customvalidator.service';

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
    title: ['', [Validators.required, Validators.minLength(5)]],
    url: ['', [Validators.required, this.customValidator.urlValidator()]],
    description: ['', Validators.required]
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

  constructor(private formBuilder: FormBuilder, private customValidator: CustomvalidatorService) {}

  onSubmit() {
    this.submitted = true;
    // this.pokeForm.statusChanges.subscribe( (some) => {
      
    // })
    if(this.pokeForm.valid) {
      console.table(this.pokeForm.value);
    }

  }

}
