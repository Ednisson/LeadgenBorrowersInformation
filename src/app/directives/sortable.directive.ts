// import { Directive } from '@angular/core';

// @Directive({
//   selector: '[appSortable]',
//   standalone: true
// })
// export class SortableDirective {

//   constructor() { }

// }




import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Country } from '../interface/country';
import { BorrowersInformation } from '../interface/borrowers-information';

export type SortColumn = keyof BorrowersInformation | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}

@Directive({
	selector: 'th[sortable]',
	standalone: true,
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})
export class NgbdSortableHeader {
	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}