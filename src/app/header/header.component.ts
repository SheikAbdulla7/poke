import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit{

  isLoggedIn = false
  userName?: string | null = null
  constructor(private auth: PokeAuthService, private modalService: NgbModal, private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem("access_token")) {
      this.userName = localStorage.getItem("user_name")
      this.isLoggedIn = true
    }
  }

  authoriseUser() {
    if(!this.isLoggedIn) {
      this.router.navigate(['/authorisation'], {queryParams: {"screen": "login"}})
    } else {
      localStorage.clear()
    }
  }



}
