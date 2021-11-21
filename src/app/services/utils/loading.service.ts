import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Injectable({
    providedIn: 'any'
})
export class LoadingService {
    loading = true;

    constructor(
        private router: Router
    ) {
        this.subscribeRouter();
    }

    setLoading(value: boolean): void {
        this.loading = value;
    }

    subscribeRouter(): void {
        this.router.events.subscribe({
            next: event => {
                if (event instanceof NavigationStart) {
                    this.loading = true;
                }
                if (event instanceof NavigationEnd) {
                    this.loading = false;
                }
                if (event instanceof NavigationCancel) {
                    this.loading = false;
                }
                if (event instanceof NavigationError) {
                    this.loading = false;
                }
            }
        });
    }
}
