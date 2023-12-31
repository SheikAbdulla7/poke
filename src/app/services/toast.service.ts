import { Injectable, TemplateRef } from "@angular/core";

export interface Toast {
    content: string,
    template?: TemplateRef<any>
    className?: string,
    delay?: number 
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    toasts: Toast[] = [];

    add(toast: Toast) {
        this.toasts.push(toast);
    }

    remove(toast: Toast) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

    clear() {
        this.toasts = [];
    }

}