import { Component, HostListener, OnInit } from '@angular/core';
import { AppStorageService } from './services/utils/app-storage.service';
import { SidebarService } from './services/utils/sidebar.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'examen-final';

    get breakpoint(): number {
        return this.sidebar.breakpoint;
    }

    @HostListener('window:resize')
    onResize(): void {
        if (window.innerWidth < this.breakpoint) {
            this.sidebar.setClosedWidth(0);
        } else {
            this.sidebar.setClosedWidth(3.5);
        }
    }
    

    constructor(
        private storage: AppStorageService,
        private sidebar: SidebarService
    ) { }

    ngOnInit(): void {
        this.storage.initStorage();
    }
}
