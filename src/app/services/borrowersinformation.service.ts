import { Injectable, OnInit, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { BorrowersInformation } from '../interface/borrowers-information';
import BORROWERSINFORMATION from '../../assets/borrowerinformation.json';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/sortable.directive';
import moment from 'moment';
interface SearchResult {
  borrowers: BorrowersInformation[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(
  borrowers: BorrowersInformation[],
  column: SortColumn,
  direction: string
): BorrowersInformation[] {
  if (direction === '' || column === '') {
    return borrowers;
  } else {
    return [...borrowers].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(
  country: BorrowersInformation,
  term: string,
  pipe: PipeTransform
) {
  // return (
  // // 	country.SeabasedAgency.toLowerCase().includes(term.toLowerCase()) ||
  // // country.LandbasedAgency.toLowerCase().includes(term.toLowerCase()) ||
  // // country.BorrowerLastName.toLowerCase().includes(term.toLowerCase()) ||
  // // country.BorrowerFirstName.toLowerCase().includes(term.toLowerCase()) ||
  // // country.BorrowerMiddleName.toLowerCase().includes(term.toLowerCase())
  // country.DateApplied.toLowerCase().includes(term.toLowerCase()) ||
  // country.SeabasedAgency.toLowerCase().includes(term.toLowerCase()) ||
  // country.LandbasedAgency.toLowerCase().includes(term.toLowerCase()) ||
  // country.BorrowerLastName.toLowerCase().includes(term.toLowerCase()) ||
  // country.BorrowerFirstName.toLowerCase().includes(term.toLowerCase()) ||
  // country.BorrowerMiddleName.toLowerCase().includes(term.toLowerCase()) ||
  // pipe.transform(country.AmountApplied).includes(term)
  // );
}

@Injectable({
  providedIn: 'root',
})
export class BorrowersinformationService implements OnInit {
  public borrowers: any;
  public total: any;
  public BORROWERS: any[] = [];
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _borrowers$ = new BehaviorSubject<BorrowersInformation[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(private pipe: DecimalPipe) {
    var data: any[] = []
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search(data)),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._borrowers$.next(result.borrowers);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  async ngOnInit() {
    await this.load();
  }
  get countries$() {
    return this._borrowers$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private  _search(data: any): Observable<SearchResult> {
    console.log("wew", data)
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
//     var borrower: [] = []
// this.load().then((el) => 
// {
// 	this.BORROWERS.push(el)
// })

// 1. sort
let borrowers = sort(data, sortColumn, sortDirection);

// 2. filter
borrowers = borrowers.filter((borrowers: any) =>
  matches(borrowers, searchTerm, this.pipe)
);
const total = borrowers.length;

// 3. paginate
borrowers = borrowers.slice(
  (page - 1) * pageSize,
  (page - 1) * pageSize + pageSize
);
		return of({ borrowers, total });
}
  public async load() 
  {
	const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxkMPTxFMGHUOa-RLyA-KQcm1v6XpkWQcnbA2rqjaLo-gBhEFvg8_sd0XCd7C6fUvXBmA/exec'
      );
      let data = await response.json();
		data = data.map((el: any) => 
		Object.fromEntries(Object.entries(el).map(([key, value]) => ([
		  key.replace(/\s+/g, "").replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace("-", ''),
		  value
		])))
	  );
      this.BORROWERS = data;
      await this._search(data);
  }
  
}
