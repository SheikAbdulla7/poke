import { Component } from '@angular/core';
import { UnderDevelopmentComponent } from '../development/under-development.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UnderDevelopmentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
