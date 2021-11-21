import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AbstractControl, ValidationErrors } from '@angular/forms';
export interface ServiceResponse {
    ok: boolean;
    msg: string;
    resp: any;
}

export interface IPagesMenu {
    link: string,
    label: string,
    icon: string,
    children?: IPagesMenu[];
}

export interface CanDeactivateComponent {
    canDeactivate: (currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot) => Promise<boolean> | boolean;
}

export type ValidatorFn = (c: AbstractControl) => ValidationErrors | null;
