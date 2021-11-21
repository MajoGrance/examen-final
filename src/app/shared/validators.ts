import { AbstractControl } from '@angular/forms';
import { ValidatorFn } from './interfaces';

/**
 * Valida que los campos password y password2 sean iguales, se utiliza para el formulario de registro.
 */
export const EqualPasswordValidator: ValidatorFn = (fg: AbstractControl) => {
    const pass1 = fg.get('contrasena')?.value;
    const pass2 = fg.get('password2')?.value;
    if (pass1 === pass2) {
        return null;
    } else {
        fg.get('password2')?.setErrors({ diff: true });
        return { diff: true };
    }
};

/**
 * Valida un campo de tipo numerico no sea 0.
 */
export const noCeroValidator: ValidatorFn = (control: AbstractControl) => {
    if (Number(control.value) !== 0) {
        return null;
    } else {
        control.setErrors({ required: true });
        return { required: true };
    }
};

