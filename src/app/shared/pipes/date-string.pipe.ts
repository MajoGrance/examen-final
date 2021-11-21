import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringDate'
})
export class DateStringPipe implements PipeTransform {

    transform(fecha: Date): string {
        return `${fecha.getFullYear()}-${fecha.getMonth() +  1}-${fecha.getDate()}`;
    }

}
