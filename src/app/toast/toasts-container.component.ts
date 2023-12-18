
import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-toasts',
    standalone: true,
    template: `
        @for (toast of toastService.toasts; track toast) {
            <ngb-toast 
                [autohide]="false" 
                [delay]="toast.delay || 5000" 
                [class]="toast.className"
                (hidden)="toastService.remove(toast)">
                {{toast.content}}
            </ngb-toast>
        }
    `,
    imports: [NgbToastModule, NgTemplateOutlet]
})

export class ToastsContainer {
    toastService = inject(ToastService)

}