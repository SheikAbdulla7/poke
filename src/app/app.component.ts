import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthoriseComponent } from './pages/authorise/authorise.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'poke';

  constructor(private route: ActivatedRoute){}

  shouldRenderHeader() : boolean{
    const currentRoot = this.route;
    // console.log(currentRoot)
    return currentRoot.component == AuthoriseComponent ? false : true
  }
}
