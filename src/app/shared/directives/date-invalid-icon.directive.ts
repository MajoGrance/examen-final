import { Directive, OnInit } from '@angular/core';
import { Calendar } from 'primeng/calendar';

@Directive({
    selector: '[appDateInvalidIcon]'
})
export class DateInvalidIconDirective implements OnInit {

    constructor(private primeCalendar: Calendar) { }

    ngOnInit(): void {
        this.primeCalendar.inputStyleClass = "form-control"
    }

}
