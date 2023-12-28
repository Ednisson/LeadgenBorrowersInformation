import { Component, OnInit, QueryList, TemplateRef, ViewChildren, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';
import {NgbHighlight, NgbModalModule, NgbPaginationModule, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Country } from './interface/country';
import { NgbdSortableHeader, SortColumn, SortEvent } from './directives/borrowerinformationsortable.directive';
import { CountryService } from './services/country.service';
import { FormsModule } from '@angular/forms';
import { BorrowersinformationService } from './services/borrowersinformation.service';
import { BorrowersInformation } from './interface/borrowers-information';
import moment from 'moment';
const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
@Component({
  selector: 'app-root',
  standalone: true,
  providers: [DecimalPipe, CountryService, BorrowersinformationService],
  imports: [CommonModule, RouterOutlet,  NgbHighlight, NgbdSortableHeader, NgbPaginationModule,  FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  public agency: string  = "";
  public principal: string  = "";
  public joiningport: string  = "";
  public position: string  = "";
  public contractTerm: string  = "";
  public loanamountrequested: number = 0;
  public loanterm: string  = "";
  public yearsAsSeafer: string  = "";
  public monthlySalary: string  = "";
  public loanPurpose: string  = "";
  public lastname: string  = "";
  public firstname: string  = "";
  public middlename: string  = "";
  public birthdate: string = '';
  public age: string = '';
  public sex: string = '';
  public civilstatus: string = '';
  public homeaddress: string = ''
  public provincialaddress: string = ''
  public homelengthofstay: string = ''
  public provinciallengthofstay: string = ''
  public socialmediaName: string = ''
  public personalEmailAddress: string = ''
  public mobileNo: string = ''
  public homePhone: string = ''
  public SSSNo: string = ''
  public TINNo: string = ''
  public homeOwnerhsip: string = ''
  public homeOwnerhsipHowMuch: string = ''
  public spouseName: string = ''
  public spouseFacebookAccount: string = ''
  public spouseMobileNo: string = ''
  
  public spouseEmployerName: string = ''
  public spouseEmployerAddress: string = ''
  public spousePosition: string = ''


public firstDependentName: string = ''
public firstDependentSchoolAttended: string = ''
public firstDependentAge: string = ''
public firstDependentContactNumber: string = ''


public secondDependentName: string = ''
public secondDependentSchoolAttended: string = ''
public secondDependentAge: string = ''
public secondDependentContactNumber: string = ''


public thirdDependentName: string = ''
public thirdDependentSchoolAttended: string = ''
public thirdDependentAge: string = ''
public thirdDependentContactNumber: string = ''


public fourthDependentName: string = ''
public fourthDependentSchoolAttended: string = ''
public fourthDependentAge: string = ''
public fourthDependentContactNumber: string = ''


public coborrowerlastname: string = ''
public coborrowerfirstname: string = ''
public coborrowermiddlename: string = ''
public coborrowerRelationshipToApplicant: string = ''


public coborrowerBirthday: string = ''
public coborrowerAge: string = ''
public coborrowerEmailAddress: string = ''
public coborrowerMobileNo: string = ''

public coborrowerAddress: string = ''

public coborrowerLenghofStay: string = ''


public coborrowerHomeOwnership: string = ''


public coborrowerHowMuch: string = ''


public borrowerfathersname: string = ''
public borrowermothersname: string = ''
public borrowerparentsaddress: string = ''
public borrowerparentsmobileno: string = ''
public borrowerparentslandlineno: string = ''


public borrowerfirstrelativename: string = ''
public borrowerfirstrelativerelationtoapplicant: string = ''
public borrowerfirstrelativeaddress: string = ''
public borrowerfirstrelativecontactno: string = ''


public borrowersecondrelativename: string = ''
public borrowersecondrelativerelationtoapplicant: string = ''
public borrowersecondrelativeaddress: string = ''
public borrowersecondrelativecontactno: string = ''


public borrowerthirdrelativename: string = ''
public borrowerthirdrelativerelationtoapplicant: string = ''
public borrowerthirdrelativeaddress: string = ''
public borrowerthirdrelativecontactno: string = ''



public encodedBy: string = ''
public dateApplied: string = ''

public borrowersList: BorrowersInformation[] = []

private modalService = inject(NgbModal);

public borrowerArray: any[] = []

//   title = 'LeadGenBorrowerList';

//   constructor(private papa: Papa, private http: HttpClient) 
//   {
//   }
// ngOnInit(): void 
// {
// }

// BorrowerInformation() 
// {

// this.http.get('assets/borrowerinformation.json').subscribe((data) => 
// {
//   console.log("borrower information", data)
//   })

// }

countries$: Observable<BorrowersInformation[]>;
//total$: Observable<number>;
public pageSizeOptions = [5, 10, 15, 20];
public pageSize = 50;
public currentPage = 1;
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
constructor(public service: BorrowersinformationService) {
  this.countries$ = service.countries$;
  //this.total$ = service.total$;
}

onSort({ column, direction }: SortEvent) {
  
  // resetting other headers
  this.headers.forEach((header) => {
    if (header.sortable !== column) {
      header.direction = '';
    }
  });

  this.service.sortColumn = column;
  this.service.sortDirection = direction;
}

async ngOnInit() {
  await this.retrieveBorrower();
}
// openScrollableContent(longContent: any, data: any) {
//   console.log("the data", data)
//   this.modalService.open(longContent, { scrollable: true });
// }

calculateDateDifference(dateToCalculate: string) 
{
  let borrowerBirthdateSplit = dateToCalculate.split("-");
  let currentDate = new Date();
  let currentDateConvertFromMoment = moment(currentDate).format("MM-DD-YYYY")
  let currentDateConvertedSplit = currentDateConvertFromMoment.split("-");
  var a = moment([parseInt(currentDateConvertedSplit[2]), (parseInt(currentDateConvertedSplit[0]) - 1), parseInt(currentDateConvertedSplit[1])]);
  var b = moment([parseInt(borrowerBirthdateSplit[2]), (parseInt(borrowerBirthdateSplit[0]) - 1), parseInt(borrowerBirthdateSplit[1])]);
  return a.diff(b, 'years').toString();
}




copyMessage(value: any) 
{
navigator.clipboard.writeText(value)
.then(el => 
  {
    alert("Copied");

  })
.catch(e => console.log(e));
}

async retrieveBorrower() 
{
  const response = await fetch(
    'https://script.google.com/macros/s/AKfycbxkMPTxFMGHUOa-RLyA-KQcm1v6XpkWQcnbA2rqjaLo-gBhEFvg8_sd0XCd7C6fUvXBmA/exec'
  );
  let array  = await response.json();
  array = array.map((el: any) => 
    Object.fromEntries(Object.entries(el).map(([key, value]) => ([
      key.replace(/\s+/g, "").replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace("-", ''),
      value
    ])))
  );
    this.borrowersList = array
}
 
selectPageSize(event: any) {
  this.pageSize = event.target.value;
  }

}
