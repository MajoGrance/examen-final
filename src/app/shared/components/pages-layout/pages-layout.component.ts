import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/utils/sidebar.service';

@Component({
    selector: 'app-pages-layout',
    templateUrl: './pages-layout.component.html',
    styleUrls: ['./pages-layout.component.scss']
})
export class PagesLayoutComponent implements OnInit {
    windowWidth = window.innerWidth;

    @HostListener('window:resize')
    onResize(): void {
        this.windowWidth = window.innerWidth;
    }

    get sidebarWidth(): number {
        if (this.sidebarSerivce.open) {
            return this.sidebarSerivce.openWidth;
        }
        return this.sidebarSerivce.closedWidth;
    }

    get sidebarCloseWidth(): number {
        return this.sidebarSerivce.closedWidth;
    }

    get breakpoint(): number {
        return this.sidebarSerivce.breakpoint;
    }

    constructor(
        private sidebarSerivce: SidebarService
    ) { }

    ngOnInit(): void {
    }

    closeSidebar(): void {
        if (window.innerWidth < this.breakpoint) {
            this.sidebarSerivce.closeSidebar();
        }
    }
}
