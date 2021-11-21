import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringDate'
})
export class StringDatePipe implements PipeTransform {

    transform(value: string | undefined): Date {
        if (value) {
            const anho = Number(value.slice(0, 4));
            const mes = Number(value.slice(5, 7));
            const dia = Number((value.slice(8, 10)));
            const date = new Date(anho, mes - 1, dia);
            return date;
        }
        return new Date();
    }

}
