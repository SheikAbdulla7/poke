import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokeAuthService } from '../services/pokeauth.service';
import { AuthModalComponent } from './auth-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private auth: PokeAuthService, private modalService: NgbModal, private router: Router) {}


  authoriseUser() {
    this.modalService.open(AuthModalComponent)
    
  }

  openModal() {
    this.router.navigate(['/authorisation'], {queryParams: {"screen": "login"}})
    // this.modalService.open(AuthModalComponent)
  }
}
