import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { BorrowersInformation } from '../../interface/borrowers-information';
//import { Ng2SearchPipe } from 'ng2-search-filter';
//import { Ng2OrderModule } from 'ng2-order-pipe';
//import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { NgbHighlight, NgbPaginationModule, NgbModal, NgbPopoverModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-borrowerslist',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbHighlight, NgbPaginationModule, NgbPopoverModule],
  templateUrl: './borrowerslist.component.html',
  styleUrl: './borrowerslist.component.scss',
  providers: []
})
export class BorrowerslistComponent implements OnInit {

  public borrowersList: BorrowersInformation[] = []
  multiplecolumnSearch: string = "";
  dateAppliedSorting: string = "fas fa-sort-up";
  dateAppliedSortingDescending: boolean = true;

  amountSorting: string = "fas fa-sort-up";
  amountSortingDescending: boolean = true;


  seaBasedSorting: string = "fas fa-sort-up";
  seaBasedSortingDescending: boolean = true;


  landBasedSorting: string = "fas fa-sort-up";
  landBasedSortingDescending: boolean = true;

  
  firstnamelandBasedSorting: string = "fas fa-sort-up";
  firstnameSortingDescending: boolean = true;


  middlenamelandBasedSorting: string = "fas fa-sort-up";
  middlenameSortingDescending: boolean = true;


  
  lastnamelandBasedSorting: string = "fas fa-sort-up";
  lastnameSortingDescending: boolean = true;




  public pageSizeOptions = [5, 10, 15, 20];
  public pageSize = 50;
  public currentPage = 1;




  public agency: string  = "";
  public principal: string  = "";
  public joiningport: string  = "";
  public position: string  = "";
  public contractTerm: string  = "";
  public loanamountrequested: string = "";
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

hideRefresh: boolean = true;

public lastUpdated: string = ''

public landlineNo: string = ''
public cellphoneNo: string = ''
public numberOfDependents: number = 0

public yearsAsOFWSeaman: number = 0;

public employer: string = ''

public spouseAddress: string = ''

public spouseBirthdate: string = ''

public spouseAge: string = ''

public spouseEmailAddress: string = ''

public relativeName: string = ''

public relativeAddress: string = ''

public relativeRelationshipToApplicant: string = ''

public relativeCellphoneNumber: string = ''

constructor() 
{
}
   ngOnInit(): void
  {
     this.retrieveBorrower();
  }

  
retrieveBorrower() 
{
  // const response = await fetch(
  //   'https://script.google.com/macros/s/AKfycbxkMPTxFMGHUOa-RLyA-KQcm1v6XpkWQcnbA2rqjaLo-gBhEFvg8_sd0XCd7C6fUvXBmA/exec'
  // );

  const response =  fetch(
    'https://script.google.com/macros/s/AKfycbxkMPTxFMGHUOa-RLyA-KQcm1v6XpkWQcnbA2rqjaLo-gBhEFvg8_sd0XCd7C6fUvXBmA/exec'
  );

  response.then(async (el) => 
  {
    let array  = await el.json();
   
   array =  array.map((el: any) =>
      Object.fromEntries(Object.entries(el).map(([key, value]) => ([
        key.replace(/\s+/g, "").replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace("-", ''),
        value
      ])))
    );
   
    array.map((el: any) => 
  {
    el.DateApplied = moment(el.DateApplied).format("MM-DD-YYYY hh:mm A");
    el.BorrowerFullName = `${el.BorrowerFirstName} ${el.BorrowerMiddleName} ${el.BorrowerLastName}`;
    el.AmountAppliedConverted = parseFloat(el.AmountApplied.replace("₱", "").replace(",", "").replace(",", ""));
    el.Agency = el.Based == 'Sea Based' ? el.SeabasedAgency : el.LandbasedAgency
   })
   this.borrowersList = array
  
   if (this.multiplecolumnSearch != "") 
   {
    this.borrowersList = this.borrowersList.filter
    (
      f => f.DateApplied.toLowerCase().includes
    (
      this.multiplecolumnSearch.toLowerCase()
    )
    ||
      f.BorrowerLastName.toString().toLowerCase().includes
    (
      this.multiplecolumnSearch.toLowerCase()
    )
    ||
    f.BorrowerFirstName.toString().toLowerCase().includes
  (
    this.multiplecolumnSearch.toLowerCase()
  )
  ||
  f.BorrowerMiddleName.toString().toLowerCase().includes
  (
  this.multiplecolumnSearch.toLowerCase()
  )
  ||
  f.Agency.toString().toLowerCase().includes
  (
  this.multiplecolumnSearch.toLowerCase()
  )
  ||
  f.AmountAppliedConverted.toString().toLowerCase().includes
  (
  this.multiplecolumnSearch.toLowerCase()
  )
  ||
  f.DesiredTermmonths.toString().toLowerCase().includes
  (
  this.multiplecolumnSearch.toLowerCase()
  )
    )
  }
  else 
  {
    this.borrowersList = array
  }
 
  })
  
}

dateAppliedSortClick() 
{

  this.amountSortingDescending = true;
  this.seaBasedSortingDescending = true;
  this.landBasedSortingDescending = true;
  this.firstnameSortingDescending = true;
  this.middlenameSortingDescending = true;
  this.lastnameSortingDescending = true;

  if (this.dateAppliedSortingDescending) 
  {
    this.borrowersList = this.borrowersList.sort((a, b) => a.DateApplied.localeCompare(b.DateApplied));
    this.dateAppliedSortingDescending = false;
  }
  else 
  {
    this.borrowersList = this.borrowersList.sort().reverse();
    this.dateAppliedSortingDescending = true;
  }
}

amountSortClick() 
{ 
  this.dateAppliedSortingDescending = true;
  this.seaBasedSortingDescending = true;
  this.landBasedSortingDescending = true;
  this.firstnameSortingDescending = true;
  this.middlenameSortingDescending = true;
  this.lastnameSortingDescending = true;
  if (this.amountSortingDescending) 
  {
    this.borrowersList.sort((a , b) =>  Number(a.AmountAppliedConverted) - Number(b.AmountAppliedConverted))
    this.amountSortingDescending = false;
  }
  else 
  {
    this.borrowersList = this.borrowersList.sort().reverse();
    this.amountSortingDescending = true;
  }
}

seaBasedSortClick() {

  this.dateAppliedSortingDescending = true;
  this.amountSortingDescending = true;
  this.landBasedSortingDescending = true;
  this.firstnameSortingDescending = true;
  this.middlenameSortingDescending = true;
  this.lastnameSortingDescending = true;


if (this.seaBasedSortingDescending) 
{
  this.borrowersList = this.borrowersList.sort((a, b) => a.Agency.localeCompare(b.Agency));
  this.seaBasedSortingDescending = false;
}
else 
{
  this.borrowersList = this.borrowersList.sort().reverse();
  this.seaBasedSortingDescending = true;
}
}

landBasedSortClick() 
{
  
this.dateAppliedSortingDescending = true;
this.amountSortingDescending = true;
this.seaBasedSortingDescending = true;
this.firstnameSortingDescending = true;
this.middlenameSortingDescending = true;
this.lastnameSortingDescending = true;

  if (this.landBasedSortingDescending) 
{
  this.borrowersList.sort((a , b) =>  Number(a.DesiredTermmonths) - Number(b.DesiredTermmonths))
  this.landBasedSortingDescending = false;
}
else 
{
  this.borrowersList = this.borrowersList.sort().reverse();
  this.landBasedSortingDescending = true;
}

}


firstnameSortClick() 
{
  
  this.dateAppliedSortingDescending = true;
  this.amountSortingDescending = true;
  this.seaBasedSortingDescending = true;
  this.landBasedSortingDescending = true;
  this.middlenameSortingDescending = true;
  this.lastnameSortingDescending = true;


  if (this.firstnameSortingDescending) 
{
  this.borrowersList = this.borrowersList.sort((a, b) => a.BorrowerFirstName.localeCompare(b.BorrowerFirstName));
  this.firstnameSortingDescending = false;
}
else 
{
  this.borrowersList = this.borrowersList.sort().reverse();
  this.firstnameSortingDescending = true;
}
}

middlenameSortClick() 
{
  
this.dateAppliedSortingDescending = true;
this.amountSortingDescending = true;
this.seaBasedSortingDescending = true;
this.landBasedSortingDescending = true;
this.firstnameSortingDescending = true;
this.lastnameSortingDescending = true;

  if (this.middlenameSortingDescending) 
{
  this.borrowersList = this.borrowersList.sort((a, b) => a.BorrowerMiddleName.localeCompare(b.BorrowerMiddleName));
  this.middlenameSortingDescending = false;
}
else 
{
  this.borrowersList = this.borrowersList.sort().reverse();
  this.middlenameSortingDescending = true;
}

}

lastnameSortClick() 
{
  
this.dateAppliedSortingDescending = true;
this.amountSortingDescending = true;
this.seaBasedSortingDescending = true;
this.landBasedSortingDescending = true;
this.firstnameSortingDescending = true;
this.middlenameSortingDescending = true;

  if (this.lastnameSortingDescending) 
{
  this.borrowersList = this.borrowersList.sort((a, b) => a.BorrowerLastName.localeCompare(b.BorrowerLastName));
  this.lastnameSortingDescending = false;
}
else 
{
  this.borrowersList = this.borrowersList.sort().reverse();
  this.lastnameSortingDescending = true;
}

}

SearchQuery() 
{
this.retrieveBorrower()
}

copyMessage(value: any) 
{
window.navigator.clipboard.writeText(value)
.then(el => 
  {
    //alert("Copied");

  })
.catch(e => console.log(e));
}

calculateDateDifference(dateToCalculate: string) 
{
  let borrowerBirthdateSplit = moment(dateToCalculate).format("MM-DD-YYYY").split("-");
  let currentDate = new Date();
  let currentDateConvertFromMoment = moment(currentDate).format("MM-DD-YYYY")
  let currentDateConvertedSplit = currentDateConvertFromMoment.split("-");
  var a = moment([parseInt(currentDateConvertedSplit[2]), (parseInt(currentDateConvertedSplit[0]) - 1), parseInt(currentDateConvertedSplit[1])]);
  var b = moment([parseInt(borrowerBirthdateSplit[2]), (parseInt(borrowerBirthdateSplit[0]) - 1), parseInt(borrowerBirthdateSplit[1])]);
  return a.diff(b, 'years').toString();
}

openXl(content: TemplateRef<any>, data: BorrowersInformation) {

  this.dateApplied = data.DateApplied;
  this.agency = data.Agency;
  this.lastname = data.BorrowerLastName;
  this.firstname = data.BorrowerFirstName;
  this.lastname = data.BorrowerLastName;
  this.middlename = data.BorrowerMiddleName;
  this.loanamountrequested = data.AmountApplied;
  this.loanterm = data.DesiredTermmonths;
  this.loanPurpose = data.Purpose;
  this.homeaddress = `${data.BorrowerHomeAddressUnitStreetDoorBuilding == '' ? '' : `${data.BorrowerHomeAddressUnitStreetDoorBuilding},`} ${data.BorrowerHomeBarangay}, ${data.BorrowerHomeCity}, ${data.BorrowerHomeProvince}`;
  this.homelengthofstay = data.BorrowerHomeLengthofStaymonths;
  this.birthdate = moment(data.BorrowerBirthDate).format('MMM-DD-YYYY');
  this.age = this.calculateDateDifference(data.BorrowerBirthDate);
  this.sex = data.BorrowerGender;
  this.provincialaddress = `${data.BorrowerProvincialAddressUnitStreetDoorBuilding == '' ? '' : `${data.BorrowerProvincialAddressUnitStreetDoorBuilding},`} ${data.BorrowerProvincialBarangay}, ${data.BorrowerProvincialCity}, ${data.BorrowerProvincialProvince}`;
  this.provinciallengthofstay = data.BorrowerProvincialLengthofStaymonths;
  this.civilstatus = data.BorrowerCivilStatus;
  this.landlineNo = data.BorrowerLandlineNo;
  this.cellphoneNo = data.BorrowerMobileNo;
  this.homeOwnerhsipHowMuch = data.BorrowerHomeOwnershipHowMuchIfOwnedMortgageRented;

  this.monthlySalary = data.Based == 'Sea Based' ?  '$' + data.SeabsedMonthlySalary : '$' + data.LandbasedMonthlySalary;



  this.numberOfDependents = 0;

if (data.Borrower1stDependentName != 'N/A' && data.Borrower1stDependentAge != 'N/A' && data.Borrower1stDependentMobileNo != 'N/A') 
{
  this.numberOfDependents++
}


if (data.Borrower2ndDependentName != 'N/A' && data.Borrower2ndDependentAge != 'N/A' && data.Borrower2ndDependentMobileNo != 'N/A') 
{
  this.numberOfDependents++
}


if (data.Borrower3rdDependentName != 'N/A' && data.Borrower3rdDependentAge != 'N/A' && data.Borrower3rdDependentMobileNo != 'N/A') 
{
  this.numberOfDependents++
}


this.yearsAsOFWSeaman = data.Based == 'Sea Based' ? parseInt(data.SeabasedYearsasSeafarer) : parseInt(data.LandbasedYearsasOFW);

this.employer = data.LandbasedEmployer;     
this.position =  data.Based == 'Sea Based' ? data.SeabasedPosition : data.LandbasedPosition;

this.personalEmailAddress = data.BorrowerPersonalEmailAddress;

this.spouseName = `${data.BorrowerSpouseLastName}, ${data.BorrowerSpouseFirstName}, ${data.BorrowerSpouseMiddleName}`;

this.spouseAddress = `${data.BorrowerSpouseHomeAddressUnitStreetDoorBuilding == '' ? '' : `${data.BorrowerSpouseHomeAddressUnitStreetDoorBuilding},`} ${data.BorrowerSpouseBarangay}, ${data.BorrowerSpouseCity}, ${data.BorrowerSpouseHomeProvince}`;

this.spouseBirthdate = data.BorrowerSpouseBirthDate != 'N/A' ? moment(data.BorrowerSpouseBirthDate).format('MMM-DD-YYYY') : data.BorrowerSpouseBirthDate;


this.spouseAge = data.BorrowerSpouseBirthDate != 'N/A' ?  this.calculateDateDifference(data.BorrowerSpouseBirthDate) : data.BorrowerSpouseBirthDate;

this.spouseEmployerName = data.BorrowerSpouseEmployerName;

this.spouseEmailAddress = data.BorrowerSpousePersonalEmailAddress;

this.relativeName = data.Borrower1stRelativeName;

this.relativeAddress = `${data.Borrower1stRelativeHomeAddressUnitStreetDoorBuilding == '' ? '' : `${data.Borrower1stRelativeHomeAddressUnitStreetDoorBuilding},`} ${data.Borrower1stRelativeHomeBarangay}, ${data.Borrower1stRelativeHomeCity}, ${data.Borrower1stRelativeHomeProvince}`;

this.relativeRelationshipToApplicant = data.Borrower1stRelativeRelationshiptoApplicant;

this.relativeCellphoneNumber = data.Borrower1stRelativeMobileNo

this.SSSNo = data.BorrowerSSSID;

this.TINNo = data.BorrowerTINID;


  //   this.agency = data.Agency;
//   this.principal = data.SeabasedPrincipal;
//   this.joiningport = data.SeabasedJoiningPort;
//   this.position = data.SeabasedPosition;
//   this.contractTerm = data.SeabasedContractTermmonths;
//   this.loanamountrequested = data.AmountApplied;
//   this.loanterm = data.DesiredTermmonths;
//   this.yearsAsSeafer = data.SeabasedYearsasSeafarer;
//   this.monthlySalary = data.SeabsedMonthlySalary;
//   this.loanPurpose = data.Purpose;
//   this.lastname = data.BorrowerLastName;
//   this.firstname = data.BorrowerFirstName;
//   this.middlename = data.BorrowerMiddleName;
//   this.birthdate = data.BorrowerBirthDate;
//   this.age = this.calculateDateDifference(data.BorrowerBirthDate);
//   this.sex = data.BorrowerGender;
//   this.civilstatus = data.BorrowerCivilStatus;
//   this.homeaddress = `${data.BorrowerHomeAddressUnitStreetDoorBuilding == '' ?'' : data.BorrowerHomeAddressUnitStreetDoorBuilding + ','} ${data.BorrowerHomeBarangay} ${data.BorrowerHomeCity}, ${data.BorrowerHomeProvince}`
//   this.provincialaddress = `${data.BorrowerProvincialAddressUnitStreetDoorBuilding == '' ?'' : data.BorrowerProvincialAddressUnitStreetDoorBuilding + ','} ${data.BorrowerProvincialBarangay} ${data.BorrowerProvincialCity}, ${data.BorrowerProvincialProvince}`
//   this.homelengthofstay = data.BorrowerHomeLengthofStaymonths;
//   this.provinciallengthofstay = data.BorrowerProvincialLengthofStaymonths;
//   this.socialmediaName = data.BorrowerWebsiteApplicationName;
//   this.personalEmailAddress = data.BorrowerPersonalEmailAddress;
//   this.mobileNo = data.BorrowerMobileNo;
//   this.homePhone = data.BorrowerLandlineNo;
//   this.SSSNo = data.BorrowerSSSID;
//   this.TINNo = data.BorrowerTINID;
//   this.homeOwnerhsip = data.BorrowerHomeOwnership;
  
//   this.homeOwnerhsipHowMuch = data.BorrowerHomeOwnershipHowMuchIfOwnedMortgageRented;
//   this.spouseName = `${data.BorrowerSpouseLastName}, ${data.BorrowerSpouseFirstName} ${data.BorrowerSpouseMiddleName}`
//   this.spouseFacebookAccount = data.BorrowerSpouseFacebookName;
//   this.spouseMobileNo = data.BorrowerSpouseMobileNo;
//   this.spouseEmployerName = data.BorrowerSpouseEmployerName == '' ? 'N/A' : data.BorrowerSpouseEmployerName;
//   this.spouseEmployerAddress = `${data.BorrowerSpouseEmployerHomeAddressUnitStreetDoorBuilding == '' ? 'N/A' : data.BorrowerSpouseEmployerHomeAddressUnitStreetDoorBuilding + ','} ${data.BorrowerSpouseEmployerBarangay == '' ? 'N/A' : data.BorrowerSpouseEmployerBarangay} ${data.BorrowerSpouseEmployerCity == '' ? 'N/A' : data.BorrowerSpouseEmployerCity} ${data.BorrowerSpouseEmployerProvince == '' ? 'N/A' : data.BorrowerSpouseEmployerProvince}`
//   this.position = "N/A";

//   this.firstDependentName = data.Borrower1stDependentName
//   this.firstDependentSchoolAttended = data.Borrower1stDependentSchoolAttended
//   this.firstDependentAge = data.Borrower1stDependentAge
//   this.firstDependentContactNumber = data.Borrower1stDependentMobileNo


  
//   this.secondDependentName = data.Borrower2ndDependentName
//   this.secondDependentSchoolAttended = data.Borrower2ndDependentSchoolAttended
//   this.secondDependentAge = data.Borrower2ndDependentAge
//   this.secondDependentContactNumber = data.Borrower2ndDependentMobileNo

  
//   this.thirdDependentName = data.Borrower3rdDependentName
//   this.thirdDependentSchoolAttended = data.Borrower3rdDependentSchoolAttended
//   this.thirdDependentAge = data.Borrower3rdDependentAge
//   this.thirdDependentContactNumber = data.Borrower3rdDependentMobileNo


  
//   this.fourthDependentName = data.Borrower4thDependentName
//   this.fourthDependentSchoolAttended = data.Borrower4thDependentSchoolAttended
//   this.fourthDependentAge = data.Borrower4thDependentAge
//   this.fourthDependentContactNumber = data.Borrower4thDependentMobileNo


//   this.coborrowerlastname = data.BorrowerCoBorrowerLastName;
//   this.coborrowerfirstname = data.BorrowerCoBorrowerFirstName;
//   this.coborrowermiddlename = data.BorrowerCoBorrowerMiddleName;
//   this.coborrowerRelationshipToApplicant = data.BorrowerCoBorrowerRelationshiptoApplicant;



//   this.coborrowerBirthday = data.BorrowerCoBorrowerBirthDate;
//   this.coborrowerAge = data.BorrowerCoBorrowerBirthDate == 'N/A' || data.BorrowerCoBorrowerBirthDate == '' ? 'N/A' :  this.calculateDateDifference(data.BorrowerCoBorrowerBirthDate);
//   this.coborrowerEmailAddress = data.BorrowerCoBorrowerPersonalEmailAddress;
//   this.coborrowerMobileNo = data.BorrowerCoBorrowerMobileNo; 



//   this.coborrowerAddress = `${data.BorrowerCoBorrowerHomeAddressUnitStreetDoorBuilding == '' ? '' : data.BorrowerCoBorrowerHomeAddressUnitStreetDoorBuilding + ','} ${data.BorrowerCoBorrowerBarangay == '' ? '' : data.BorrowerCoBorrowerBarangay} ${data.BorrowerCoBorrowerCity == '' ? '' : data.BorrowerCoBorrowerCity} ${data.BorrowerCoBorrowerBarangay == '' ? '' : data.BorrowerCoBorrowerHomeProvince}`
//   this.coborrowerLenghofStay = data.BorrowerCoBorrowerHomeLengthofStaymonths


// this.coborrowerHomeOwnership = data.BorrowerCoBorrowerHomeOwnership;


// this.coborrowerHowMuch = data.BorrowerCoBorrowerHomeOwnershipHowMuch;



// this.borrowerfathersname = data.BorrowerFathersName
// this.borrowermothersname = data.BorrowerMothersName
// this.borrowerparentsaddress = `${data.BorrowerParentsHomeAddressUnitStreetDoorBuilding == '' ? '' : data.BorrowerParentsHomeAddressUnitStreetDoorBuilding + ','} ${data.BorrowerParentsHomeBarangay == '' ? '' : data.BorrowerParentsHomeBarangay} ${data.BorrowerParentsHomeCity == '' ? '' : data.BorrowerParentsHomeCity} ${data.BorrowerParentsHomeProvince == '' ? '' : data.BorrowerParentsHomeProvince}`
// this.borrowerparentsmobileno = data.BorrowerParentsMobileNo;
// this.borrowerparentslandlineno = data.BorrowerParentsLandlineNo





// this.borrowerfirstrelativename = data.Borrower1stRelativeName
// this.borrowerfirstrelativerelationtoapplicant = data.Borrower1stRelativeRelationshiptoApplicant;
// this.borrowerfirstrelativeaddress = `${data.Borrower1stRelativeHomeAddressUnitStreetDoorBuilding == '' ? '' : data.Borrower1stRelativeHomeAddressUnitStreetDoorBuilding + ','} ${data.Borrower1stRelativeHomeBarangay == '' ? '' : data.Borrower1stRelativeHomeBarangay} ${data.Borrower1stRelativeHomeCity == '' ? '' : data.Borrower1stRelativeHomeCity} ${data.Borrower1stRelativeHomeProvince == '' ? '' : data.Borrower1stRelativeHomeProvince}`
// this.borrowerfirstrelativecontactno = data.Borrower1stRelativeMobileNo


// this.borrowersecondrelativename = data.Borrower2ndRelativeName
// this.borrowersecondrelativerelationtoapplicant = data.Borrower2ndRelativeRelationshiptoApplicant;
// this.borrowersecondrelativeaddress = `${data.Borrower2ndRelativeHomeAddressUnitStreetDoorBuilding == '' ? '' : data.Borrower2ndRelativeHomeAddressUnitStreetDoorBuilding + ','} ${data.Borrower2ndRelativeHomeBarangay == '' ? '' : data.Borrower2ndRelativeHomeBarangay} ${data.Borrower2ndRelativeHomeCity == '' ? '' : data.Borrower2ndRelativeHomeCity} ${data.Borrower2ndRelativeHomeProvince == '' ? '' : data.Borrower2ndRelativeHomeProvince}`
// this.borrowersecondrelativecontactno = data.Borrower2ndRelativeMobileNo


// this.borrowerthirdrelativename = data.Borrower3rdRelativeName
// this.borrowerthirdrelativerelationtoapplicant = data.Borrower3rdRelativeRelationshiptoApplicant;
// this.borrowerthirdrelativeaddress = `${data.Borrower3rdRelativeHomeAddressUnitStreetDoorBuilding == '' ? '' : data.Borrower3rdRelativeHomeAddressUnitStreetDoorBuilding + ','} ${data.Borrower3rdRelativeHomeBarangay == '' ? '' : data.Borrower3rdRelativeHomeBarangay} ${data.Borrower3rdRelativeHomeCity == '' ? '' : data.Borrower3rdRelativeHomeCity} ${data.Borrower3rdRelativeHomeProvince == '' ? '' : data.Borrower3rdRelativeHomeProvince}`
// this.borrowerthirdrelativecontactno = data.Borrower3rdRelativeMobileNo
// this.encodedBy = data.EncodedBy;
 




  this.modalService.open(content, { size: 'xl', scrollable: true, backdrop: 'static', keyboard: false, fullscreen: true });
}

 refreshTable() 
{
this.hideRefresh = false;  
this.retrieveBorrower();
setTimeout(() => {
  this.hideRefresh =  true
}, 2000);
var dateAndTimeToday = moment(new Date()).format("MM-DD-YYYY hh:mm A");
localStorage.setItem('lastrefreshed', JSON.stringify(dateAndTimeToday));
this.getDateLastUpdated();
}

async login() 
{

  const response = await fetch(
    'assets/users.json'
  );
  
  let array  = await response.json();


}

getDateLastUpdated() 
{
  var lastUpdatedFromLocalStorage = JSON.parse(localStorage.getItem('lastrefreshed') as any);

  if (lastUpdatedFromLocalStorage != null) 
  {
  this.lastUpdated = JSON.stringify(lastUpdatedFromLocalStorage).replace('"', '').replace('"', '');
  }

}

closePopOver(p: NgbPopover) 
{
  setTimeout(() => {
    p.close();
  }, 500);
}


copyEvent(event: any) 
{
  var value = event.target.value;
 ChangeInputColorsandAllCapsThePasteValueExceptEmail
  this.copyMessage(value.toUpperCase());
}

copyEventEmailNotUppercase(event: any) 
{
  var value = event.target.value;
  this.copyMessage(value.toLowerCase());

  //console.log("copy event", event.target.value);

  //this.copyMessage(value);

  this.unsecuredCopyToClipboard(value);
}

unsecuredCopyToClipboard(text: any) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    //console.log("copied to clipboard")
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  document.body.removeChild(textArea);
}

}
