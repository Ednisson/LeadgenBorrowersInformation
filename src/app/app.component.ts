import { Component, OnInit, QueryList, TemplateRef, ViewChildren, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';
import {NgbHighlight, NgbModalModule, NgbPaginationModule, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Country } from './interface/country';
import { NgbdSortableHeader, SortEvent } from './directives/borrowerinformationsortable.directive';
import { CountryService } from './services/country.service';
import { FormsModule } from '@angular/forms';
import { BorrowersinformationService } from './services/borrowersinformation.service';
import { BorrowersInformation } from './interface/borrowers-information';
import moment from 'moment';

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
  public loanamountrequested: string  = "";
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


private modalService = inject(NgbModal);
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
// })

// }

countries$: Observable<BorrowersInformation[]>;
total$: Observable<number>;
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
constructor(public service: BorrowersinformationService) {
  this.countries$ = service.countries$;
  this.total$ = service.total$;
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

ngOnInit(): void {
  
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


openXl(content: TemplateRef<any>, data: BorrowersInformation) {
  

  this.agency = data.SeabasedAgency;
  this.principal = data.SeabasedPrincipal;
  this.joiningport = data.SeabasedJoiningPort;
  this.position = data.SeabasedPosition;
  this.contractTerm = data.SeabasedContractTerm;
  this.loanamountrequested = data.AmountApplied;
  this.loanterm = data.DesiredTerm;
  this.yearsAsSeafer = data.SeabasedYearsasSeafarer;
  this.monthlySalary = data.SeabsedMonthlySalary;
  this.loanPurpose = data.Purpose;
  this.lastname = data.BorrowerLastName;
  this.firstname = data.BorrowerFirstName;
  this.middlename = data.BorrowerMiddleName;
  this.birthdate = data.BorrowerBirthDate;
  this.age = this.calculateDateDifference(data.BorrowerBirthDate);
  this.sex = data.BorrowerGender;
  this.civilstatus = data.BorrowerCivilStatus;
  this.homeaddress = `${data.BorrowerHomeAddress == '' ?'' : data.BorrowerHomeAddress + ','} ${data.BorrowerHomeBarangay} ${data.BorrowerHomeCity}, ${data.BorrowerHomeProvince}`
  this.provincialaddress = `${data.BorrowerProvincialAddress == '' ?'' : data.BorrowerProvincialAddress + ','} ${data.BorrowerProvincialBarangay} ${data.BorrowerProvincialCity}, ${data.BorrowerProvincialProvince}`
  this.homelengthofstay = data.BorrowerHomeLengthofStay;
  this.provinciallengthofstay = data.BorrowerProvincialLengthofStay;
  this.socialmediaName = data.BorrowerWebsiteApplicationName;
  this.personalEmailAddress = data.BorrowerPersonalEmailAddress;
  this.mobileNo = data.BorrowerMobileNo;
  this.homePhone = data.BorrowerLandlineNo;
  this.SSSNo = data.BorrowerSSSID;
  this.TINNo = data.BorrowerTINID;
  this.homeOwnerhsip = data.BorrowerHomeOwnership;
  this.homeOwnerhsipHowMuch = data.BorrowerHomeOwnershipHowMuch;
  this.spouseName = `${data.BorrowerSpouseLastName}, ${data.BorrowerSpouseFirstName} ${data.BorrowerSpouseMiddleName}`
  this.spouseFacebookAccount = data.BorrowerSpouseFacebookName;
  this.spouseMobileNo = data.BorrowerSpouseMobileNo;
  this.spouseEmployerName = data.BorrowerSpouseEmployerName == '' ? 'N/A' : data.BorrowerSpouseEmployerName;
  this.spouseEmployerAddress = `${data.BorrowerSpouseEmployerHomeAddress == '' ? 'N/A' : data.BorrowerSpouseEmployerHomeAddress + ','} ${data.BorrowerSpouseEmployerBarangay == '' ? 'N/A' : data.BorrowerSpouseEmployerBarangay} ${data.BorrowerSpouseEmployerCity == '' ? 'N/A' : data.BorrowerSpouseEmployerCity} ${data.BorrowerSpouseEmployerProvince == '' ? 'N/A' : data.BorrowerSpouseEmployerProvince}`
  this.position = "N/A";

  this.firstDependentName = data.Borrower1stDependentName
  this.firstDependentSchoolAttended = data.Borrower1stDependentSchoolAttended
  this.firstDependentAge = data.Borrower1stDependentAge
  this.firstDependentContactNumber = data.Borrower1stDependentMobileNo


  
  this.secondDependentName = data.Borrower2ndDependentName
  this.secondDependentSchoolAttended = data.Borrower2ndDependentSchoolAttended
  this.secondDependentAge = data.Borrower2ndDependentAge
  this.secondDependentContactNumber = data.Borrower2ndDependentMobileNo

  
  this.thirdDependentName = data.Borrower3rdDependentName
  this.thirdDependentSchoolAttended = data.Borrower3rdDependentSchoolAttended
  this.thirdDependentAge = data.Borrower3rdDependentAge
  this.thirdDependentContactNumber = data.Borrower3rdDependentMobileNo


  
  this.fourthDependentName = data.Borrower4thDependentName
  this.fourthDependentSchoolAttended = data.Borrower4thDependentSchoolAttended
  this.fourthDependentAge = data.Borrower4thDependentAge
  this.fourthDependentContactNumber = data.Borrower4thDependentMobileNo


  this.coborrowerlastname = data.BorrowerCoBorrowerLastName;
  this.coborrowerfirstname = data.BorrowerCoBorrowerFirstName;
  this.coborrowermiddlename = data.BorrowerCoBorrowerMiddleName;
  this.coborrowerRelationshipToApplicant = data.BorrowerCoBorrowerRelationshiptoApplicant;



  this.coborrowerBirthday = data.BorrowerCoBorrowerBirthDate;
  this.coborrowerAge =  this.calculateDateDifference(data.BorrowerCoBorrowerBirthDate);
  this.coborrowerEmailAddress = data.BorrowerCoBorrowerPersonalEmailAddress;
  this.coborrowerMobileNo = data.BorrowerCoBorrowerMobileNo; 



  this.coborrowerAddress = `${data.BorrowerCoBorrowerHomeAddress == '' ? '' : data.BorrowerCoBorrowerHomeAddress + ','} ${data.BorrowerCoBorrowerBarangay == '' ? '' : data.BorrowerCoBorrowerBarangay} ${data.BorrowerCoBorrowerCity == '' ? '' : data.BorrowerCoBorrowerCity} ${data.BorrowerCoBorrowerBarangay == '' ? '' : data.BorrowerCoBorrowerHomeProvince}`
this.coborrowerLenghofStay = data.BorrowerCoBorrowerHomeLengthofStay


this.coborrowerHomeOwnership = data.BorrowerCoBorrowerHomeOwnership;


this.coborrowerHowMuch = data.BorrowerCoBorrowerHomeOwnershipHowMuch;


this.borrowerfathersname = data.BorrowerFathersName
this.borrowermothersname = data.BorrowerMothersName
this.borrowerparentsaddress = `${data.BorrowerParentsHomeAddress == '' ? '' : data.BorrowerParentsHomeAddress + ','} ${data.BorrowerParentsHomeBarangay == '' ? '' : data.BorrowerParentsHomeBarangay} ${data.BorrowerParentsHomeCity == '' ? '' : data.BorrowerParentsHomeCity} ${data.BorrowerParentsHomeProvince == '' ? '' : data.BorrowerParentsHomeProvince}`
this.borrowerparentsmobileno = data.BorrowerParentsMobileNo;
this.borrowerparentslandlineno = data.BorrowerParentsLandlineMobileNo







this.borrowerfirstrelativename = data.Borrower1stRelativeName
this.borrowerfirstrelativerelationtoapplicant = data.Borrower1stRelativeRelationshiptoApplicant;
this.borrowerfirstrelativeaddress = `${data.Borrower1stRelativeHomeAddress == '' ? '' : data.Borrower1stRelativeHomeAddress + ','} ${data.Borrower1stRelativeHomeBarangay == '' ? '' : data.Borrower1stRelativeHomeBarangay} ${data.Borrower1stRelativeHomeCity == '' ? '' : data.Borrower1stRelativeHomeCity} ${data.Borrower1stRelativeHomeProvince == '' ? '' : data.Borrower1stRelativeHomeProvince}`
this.borrowerfirstrelativecontactno = data.Borrower1stRelativeMobileNo


this.borrowersecondrelativename = data.Borrower2ndRelativeName
this.borrowersecondrelativerelationtoapplicant = data.Borrower2ndRelativeRelationshiptoApplicant;
this.borrowersecondrelativeaddress = `${data.Borrower2ndRelativeHomeAddress == '' ? '' : data.Borrower2ndRelativeHomeAddress + ','} ${data.Borrower2ndRelativeHomeBarangay == '' ? '' : data.Borrower2ndRelativeHomeBarangay} ${data.Borrower2ndRelativeHomeCity == '' ? '' : data.Borrower2ndRelativeHomeCity} ${data.Borrower2ndRelativeHomeProvince == '' ? '' : data.Borrower2ndRelativeHomeProvince}`
this.borrowersecondrelativecontactno = data.Borrower2ndRelativeMobileNo


this.borrowerthirdrelativename = data.Borrower3rdRelativeName
this.borrowerthirdrelativerelationtoapplicant = data.Borrower3rdRelativeRelationshiptoApplicant;
this.borrowerthirdrelativeaddress = `${data.Borrower3rdRelativeHomeAddress == '' ? '' : data.Borrower3rdRelativeHomeAddress + ','} ${data.Borrower3rdRelativeHomeBarangay == '' ? '' : data.Borrower3rdRelativeHomeBarangay} ${data.Borrower3rdRelativeHomeCity == '' ? '' : data.Borrower3rdRelativeHomeCity} ${data.Borrower3rdRelativeHomeProvince == '' ? '' : data.Borrower3rdRelativeHomeProvince}`
this.borrowerthirdrelativecontactno = data.Borrower3rdRelativeMobileNo


this.encodedBy = data.EncodedBy;

this.dateApplied = moment(data.DateApplied).toDate().toString();


  this.modalService.open(content, { size: 'xl', scrollable: true, backdrop: 'static', keyboard: false });
}


copyMessage(value: string) 
{
navigator.clipboard.writeText(value)
.then(el => 
  {
    alert("Copied");

  })
.catch(e => console.log(e));
}

}
