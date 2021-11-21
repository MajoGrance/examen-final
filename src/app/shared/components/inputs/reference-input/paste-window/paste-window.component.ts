import { Component, Input, OnInit, Output, EventEmitter, HostListener, Type, OnChanges, SimpleChanges } from '@angular/core';
import { Table } from 'primeng/table';
export interface IPasteColumns {
    field: string;
    header: string;
    type: 'text' | 'numeric' | 'id' | 'date' | 'boolean' | 'option';
    labels?: string[];
    refField?: string;
    refName?: string;
}

@Component({
    selector: 'app-paste-window',
    templateUrl: './paste-window.component.html',
    styleUrls: ['./paste-window.component.scss']
})
export class PasteWindowComponent implements OnInit, OnChanges {
    @Input() name = '';
    @Input() display!: boolean;
    @Input() source: any[] = [];
    @Input() clase!: Type<any>;
    @Input() dataKey = 'id';
    @Input() columns: IPasteColumns[] = [];
    @Output() selectRow = new EventEmitter();
    @Output() displayChange = new EventEmitter();
    filterValue = '';

    /**
     * Ancho de la pantalla del dispositivo en el que corre el sistema en px.
     */
    innerWidth = window.innerWidth;
    clonedSource: any[] = [];

    @HostListener('window:resize')
    onResize(): void {
        this.innerWidth = window.innerWidth;
    }

    constructor(
    ) { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.source) {
            this.getClonedSource();
        }
    }

    getClonedSource(): void {
        const newSource: any[] = [];
        for (const obj of this.source) {
            let newObj = Object.assign({}, obj);
            for (const col of this.columns) {
                if (col.refName && col.refField) {
                    newObj[col.field] = newObj[col.refName]?newObj[col.refName][col.refField]:'';
                }
                if (col.type === 'option') {
                    newObj[col.field] = col.labels?col.labels[newObj[col.field]]:'';
                }
            }
            newSource.push(newObj);
        }
        this.clonedSource = newSource;
    }

    setDisplay(value: boolean): void {
        this.display = value;
        this.displayChange.emit(this.display);
    }

    onSelectRow(row: any): void {
        this.selectRow.emit(row);
    }

    clear(input: HTMLInputElement, dt: Table) {
        input.value = '';
        dt.filterGlobal(input.value, 'contains')
    }

    filterGlobal(event: any, dt: Table): void {
        dt.filterGlobal(event.target.value, 'contains');
    }

}
