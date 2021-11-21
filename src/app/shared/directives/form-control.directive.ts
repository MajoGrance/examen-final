import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
    selector: '[appFormControl]'
})
export class FormControlDirective implements OnInit {
    constructor(private input: ElementRef) { }

    ngOnInit(): void {
        const input: HTMLInputElement = this.input.nativeElement.getElementsByTagName('input')[0];
        if (input) {
            input.classList.add('form-control');
        }
    }
}
