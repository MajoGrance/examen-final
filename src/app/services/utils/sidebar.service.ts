import { HostListener, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    open = false;
    openWidth = 18;
    closedWidth = 0;
    breakpoint = 961;

    constructor() { 
        if (window.innerWidth >= this.breakpoint) {
            this.closedWidth = 3.5;
            this.openSidebar();
        }
    }

    toggleSidebar(): void {
        this.open = !this.open;
    }

    openSidebar(): void {
        this.open = true;
    }

    closeSidebar(): void {
        this.open = false;
    }

    setClosedWidth(n: number): void {
        this.closedWidth = n;
    }
}
