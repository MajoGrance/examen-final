import { Component, OnInit } from '@angular/core';
import { IPagesMenu } from '../../../interfaces';
import { SidebarService } from '../../../../services/utils/sidebar.service';
import { Router } from '@angular/router';

export const MENU_ITEMS = [
    { link: 'clientes', label: 'Clientes', icon: 'person' },
    { link: 'productos', label: 'Productos', icon: 'inventory_2' },
    { link: 'ventas', label: 'Ventas', icon: 'local_mall' },
    { link: 'reporte-resumido', label: 'Reporte resumido', icon: 'summarize' },
    { link: 'reporte-detallado', label: 'Reporte detallado', icon: 'receipt_long' },
]

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    items: IPagesMenu[] = MENU_ITEMS;

    get sidebarWidth(): number {
        if (this.sidebarSerivce.open) {
            return this.sidebarSerivce.openWidth;
        }
        return this.sidebarSerivce.closedWidth;
    }

    get breakpoint(): number {
        return this.sidebarSerivce.breakpoint;
    }

    constructor(
        private sidebarSerivce: SidebarService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    async navigate(url: string): Promise<void> {
        await this.router.navigate([`/sitio/${url}`]);
        if (window.innerWidth < this.breakpoint) {
            this.sidebarSerivce.closeSidebar();
        }
    }

    isActive(url: string): boolean {
        if (this.router.url.indexOf(url) > -1) {
            return true;
        }
        return false;
    }
}
