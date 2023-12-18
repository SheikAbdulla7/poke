import { Component, inject, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from './ModalConfig';

@Component({
  selector: 'app-pokemodal',
  standalone: true,
  imports: [],
  templateUrl: './pokemodal.component.html',
  styleUrl: './pokemodal.component.css'
})
export class PokemodalComponent {
  modal = inject(NgbActiveModal);
  @Input() public modalConfig?: ModalConfig;



}
