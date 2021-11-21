import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../../services/utils/sidebar.service';
import { AuthService } from '../../../../services/utils/auth.service';
import { IUsuario } from '../../../../models/usuario.model';
import { LoadingService } from '../../../../services/utils/loading.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    /**
     * Lista de opciones en el menú de usuario.
     */
    userItems: MenuItem[] = [
        { label: 'Cerrar sesión', routerLink: '/auth/logout', icon: 'pi pi-power-off'}
    ];

    get sidebar(): SidebarService {
        return this.sidebarService;
    }

    get user(): IUsuario | null {
        return this.authService.getCurrentUser();
    }

    get loading(): boolean {
        return this.loadingService.loading;
    }

    get userInitial(): string {
        const user = this.user;
        if (user?.nombre) {
            return user?.nombre[0];
        }
        return 'M';
    }

    constructor(
        private sidebarService: SidebarService,
        private authService: AuthService,
        private loadingService: LoadingService
    ) { }

    ngOnInit(): void {
    }

    toggleSidebar(): void {
        this.sidebarService.toggleSidebar();
    }
}
