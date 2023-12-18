
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokeformComponent } from '../../pokeform/pokeform.component';
import { ToastsContainer } from '../../toast/toasts-container.component';
@Component({
    selector: 'app-saves-conatiner',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastsContainer],
    templateUrl: './savescontainer.component.html',
    styleUrl: './savescontainer.component.css'
})

export class SavesContainerComponent implements OnInit {
    constructor(private modalService: NgbModal) { }

    ngOnInit() { }

    openForm() {
        this.modalService.open(PokeformComponent);
    }
}