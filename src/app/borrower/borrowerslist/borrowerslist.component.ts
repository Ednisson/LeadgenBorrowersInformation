import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApplicationRef, Component, Inject, NgZone, OnInit, PLATFORM_ID, TemplateRef, inject } from '@angular/core';
import { BorrowersInformation } from '../../interface/borrowers-information';
//import { Ng2SearchPipe } from 'ng2-search-filter';
//import { Ng2OrderModule } from 'ng2-order-pipe';
//import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { NgbHighlight, NgbPaginationModule, NgbModal, NgbPopoverModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { signInWithEmailAndPassword, Auth, signOut, updateCurrentUser  } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/authentication/auth.service';
@Component({
  selector: 'app-borrowerslist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbHighlight,
    NgbPaginationModule,
    NgbPopoverModule,
  ],
  templateUrl: './borrowerslist.component.html',
  styleUrl: './borrowerslist.component.scss',
  providers: [],
})
export class BorrowerslistComponent implements OnInit {
  public borrowersList: BorrowersInformation[] = [];
  multiplecolumnSearch: string = '';
  dateAppliedSorting: string = 'fas fa-sort-up';
  dateAppliedSortingDescending: boolean = true;
  amountSorting: string = 'fas fa-sort-up';
  amountSortingDescending: boolean = true;
  seaBasedSorting: string = 'fas fa-sort-up';
  seaBasedSortingDescending: boolean = true;
  desiredTermSorting: string = 'fas fa-sort-up';
  desiredTermSortingDescending: boolean = true;
  firstnamelandBasedSorting: string = 'fas fa-sort-up';
  firstnameSortingDescending: boolean = true;
  middlenamelandBasedSorting: string = 'fas fa-sort-up';
  middlenameSortingDescending: boolean = true;
  lastnamelandBasedSorting: string = 'fas fa-sort-up';
  lastnameSortingDescending: boolean = true;
  statusSorting: string = 'fas fa-sort-up';
  statusSortingDescending: boolean = true;
  public pageSizeOptions = [5, 10, 15, 20];
  public pageSize = 50;
  public currentPage = 1;
  public agency: string = '';
  public principal: string = '';
  public joiningport: string = '';
  public position: string = '';
  public contractTerm: string = '';
  public loanamountrequested: string = '';
  public loanterm: string = '';
  public yearsAsSeafer: string = '';
  public monthlySalary: string = '';
  public loanPurpose: string = '';
  public lastname: string = '';
  public firstname: string = '';
  public middlename: string = '';
  public birthdate: string = '';
  public age: string = '';
  public sex: string = '';
  public civilstatus: string = '';
  public homeaddress: string = '';
  public provincialaddress: string = '';
  public homelengthofstay: string = '';
  public provinciallengthofstay: string = '';
  public socialmediaName: string = '';
  public personalEmailAddress: string = '';
  public mobileNo: string = '';
  public homePhone: string = '';
  public SSSNo: string = '';
  public TINNo: string = '';
  public homeOwnerhsip: string = '';
  public homeOwnerhsipHowMuch: string = '';
  public spouseName: string = '';
  public spouseFacebookAccount: string = '';
  public spouseMobileNo: string = '';
  public spouseEmployerName: string = '';
  public spouseEmployerAddress: string = '';
  public spousePosition: string = '';
  public firstDependentName: string = '';
  public firstDependentSchoolAttended: string = '';
  public firstDependentAge: string = '';
  public firstDependentContactNumber: string = '';
  public secondDependentName: string = '';
  public secondDependentSchoolAttended: string = '';
  public secondDependentAge: string = '';
  public secondDependentContactNumber: string = '';
  public thirdDependentName: string = '';
  public thirdDependentSchoolAttended: string = '';
  public thirdDependentAge: string = '';
  public thirdDependentContactNumber: string = '';
  public fourthDependentName: string = '';
  public fourthDependentSchoolAttended: string = '';
  public fourthDependentAge: string = '';
  public fourthDependentContactNumber: string = '';
  public coborrowerlastname: string = '';
  public coborrowerfirstname: string = '';
  public coborrowermiddlename: string = '';
  public coborrowerRelationshipToApplicant: string = '';
  public coborrowerBirthday: string = '';
  public coborrowerAge: string = '';
  public coborrowerEmailAddress: string = '';
  public coborrowerMobileNo: string = '';
  public coborrowerAddress: string = '';
  public coborrowerLenghofStay: string = '';
  public coborrowerHomeOwnership: string = '';
  public coborrowerHowMuch: string = '';
  public borrowerfathersname: string = '';
  public borrowermothersname: string = '';
  public borrowerparentsaddress: string = '';
  public borrowerparentsmobileno: string = '';
  public borrowerparentslandlineno: string = '';
  public borrowerfirstrelativename: string = '';
  public borrowerfirstrelativerelationtoapplicant: string = '';
  public borrowerfirstrelativeaddress: string = '';
  public borrowerfirstrelativecontactno: string = '';
  public borrowersecondrelativename: string = '';
  public borrowersecondrelativerelationtoapplicant: string = '';
  public borrowersecondrelativeaddress: string = '';
  public borrowersecondrelativecontactno: string = '';
  public borrowerthirdrelativename: string = '';
  public borrowerthirdrelativerelationtoapplicant: string = '';
  public borrowerthirdrelativeaddress: string = '';
  public borrowerthirdrelativecontactno: string = '';
  public encodedBy: string = '';
  public dateApplied: string = '';
  private modalService = inject(NgbModal);
  hideRefresh: boolean = true;
  public lastUpdated: string = '';
  public landlineNo: string = '';
  public cellphoneNo: string = '';
  public numberOfDependents: number = 0;
  public yearsAsOFWSeaman: number = 0;
  public employer: string = '';
  public spouseAddress: string = '';
  public spouseBirthdate: string = '';
  public spouseAge: string = '';
  public spouseEmailAddress: string = '';
  public relativeName: string = '';
  public relativeAddress: string = '';
  public relativeRelationshipToApplicant: string = '';
  public relativeCellphoneNumber: string = '';
  public loanAccountStatus: string = '';
  public loanIndex: string = '';
  public updatingStatusFunctionTriggered: boolean = false;
  public confirmationMessage: string = ''
  public currentstatusValue: string = ''
  public xlModal: any;
  public currentUserLoggedInRole: string = ''
  constructor(
    public auth: Auth,
    private authService: AuthService,
    private router: Router,
    private applicationRef: ApplicationRef,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.retrieveBorrowerWithApplicationTick();
    this.currentUserLoggedInRole = this.authService.getCurrentUserLoggedinSessionStorageObject().displayName;
  }
  async ngOnInit() 
  {
    window.history.pushState(null, "", window.location.href);        
    window.onpopstate = function() {
        window.history.pushState(null, "", window.location.href);
    };
  }
  retrieveBorrowerWithApplicationTick() {
    this.router.events.subscribe(() => {
      this.zone.run(() => {
        setTimeout(async () => {
          this.applicationRef.tick();
          await this.GetBorrowersLoanAccountInformation();
        }, 0);
      });
    });
  }
  dateAppliedSortClick() {
    this.amountSortingDescending = true;
    this.seaBasedSortingDescending = true;
    this.desiredTermSortingDescending = true;
    this.firstnameSortingDescending = true;
    this.middlenameSortingDescending = true;
    this.lastnameSortingDescending = true;
    this.statusSortingDescending = true;

    if (this.dateAppliedSortingDescending) {
      // this.borrowersList = this.borrowersList.sort((a, b) => a.DateApplied.localeCompare(b.DateApplied));

      this.borrowersList = this.borrowersList.sort((a, b) => {
        let dateA = new Date(a.DateApplied);
        let dateB = new Date(b.DateApplied);

        return Number(dateA) - Number(dateB);
      });
      this.dateAppliedSortingDescending = false;
    } else {
      this.borrowersList = this.borrowersList.sort((a, b) => {
        let dateA = new Date(a.DateApplied);
        let dateB = new Date(b.DateApplied);

        return Number(dateB) - Number(dateA);
      });
      this.dateAppliedSortingDescending = true;
    }
  }
  amountSortClick() {
    this.dateAppliedSortingDescending = true;
    this.seaBasedSortingDescending = true;
    this.desiredTermSortingDescending = true;
    this.firstnameSortingDescending = true;
    this.middlenameSortingDescending = true;
    this.lastnameSortingDescending = true;
    this.statusSortingDescending = true;
    if (this.amountSortingDescending) {
      this.borrowersList.sort(
        (a, b) =>
          Number(a.AmountAppliedConverted) - Number(b.AmountAppliedConverted)
      );
      this.amountSortingDescending = false;
    } else {
      this.borrowersList = this.borrowersList.sort().reverse();
      this.amountSortingDescending = true;
    }
  }
  seaBasedSortClick() {
    this.dateAppliedSortingDescending = true;
    this.amountSortingDescending = true;
    this.desiredTermSortingDescending = true;
    this.firstnameSortingDescending = true;
    this.middlenameSortingDescending = true;
    this.lastnameSortingDescending = true;
    this.statusSortingDescending = true;

    if (this.seaBasedSortingDescending) {
      this.borrowersList = this.borrowersList.sort((a, b) =>
        a.Agency.localeCompare(b.Agency)
      );
      this.seaBasedSortingDescending = false;
    } else {
      this.borrowersList = this.borrowersList.sort().reverse();
      this.seaBasedSortingDescending = true;
    }
  }
  desiredTermSortClick() {
    this.dateAppliedSortingDescending = true;
    this.amountSortingDescending = true;
    this.seaBasedSortingDescending = true;
    this.firstnameSortingDescending = true;
    this.middlenameSortingDescending = true;
    this.lastnameSortingDescending = true;
    this.statusSortingDescending = true;
    if (this.desiredTermSortingDescending) {
      this.borrowersList.sort(
        (a, b) => Number(a.DesiredTermmonths) - Number(b.DesiredTermmonths)
      );
      this.desiredTermSortingDescending = false;
    } else {
      this.borrowersList = this.borrowersList.sort().reverse();
      this.desiredTermSortingDescending = true;
    }
  }
  firstnameSortClick() {
    this.dateAppliedSortingDescending = true;
    this.amountSortingDescending = true;
    this.seaBasedSortingDescending = true;
    this.desiredTermSortingDescending = true;
    this.middlenameSortingDescending = true;
    this.lastnameSortingDescending = true;
    this.statusSortingDescending = true;

    if (this.firstnameSortingDescending) {
      this.borrowersList = this.borrowersList.sort((a, b) =>
        a.BorrowerFirstName.localeCompare(b.BorrowerFirstName)
      );
      this.firstnameSortingDescending = false;
    } else {
      this.borrowersList = this.borrowersList.sort().reverse();
      this.firstnameSortingDescending = true;
    }
  }
  middlenameSortClick() {
    this.dateAppliedSortingDescending = true;
    this.amountSortingDescending = true;
    this.seaBasedSortingDescending = true;
    this.desiredTermSortingDescending = true;
    this.firstnameSortingDescending = true;
    this.lastnameSortingDescending = true;
    this.statusSortingDescending = true;
    if (this.middlenameSortingDescending) {
      this.borrowersList = this.borrowersList.sort((a, b) =>
        a.BorrowerMiddleName.localeCompare(b.BorrowerMiddleName)
      );
      this.middlenameSortingDescending = false;
    } else {
      this.borrowersList = this.borrowersList.sort().reverse();
      this.middlenameSortingDescending = true;
    }
  }
  lastnameSortClick() {
    this.dateAppliedSortingDescending = true;
    this.amountSortingDescending = true;
    this.seaBasedSortingDescending = true;
    this.desiredTermSortingDescending = true;
    this.firstnameSortingDescending = true;
    this.middlenameSortingDescending = true;
    this.statusSortingDescending = true;
    if (this.lastnameSortingDescending) {
      this.borrowersList = this.borrowersList.sort((a, b) =>
        a.BorrowerLastName.localeCompare(b.BorrowerLastName)
      );
      this.lastnameSortingDescending = false;
    } else {
      this.borrowersList = this.borrowersList.sort().reverse();
      this.lastnameSortingDescending = true;
    }
  }
  async SearchQuery() {
    await this.GetBorrowersLoanAccountInformation();
  }
  statusSortClick() {
    this.dateAppliedSortingDescending = true;
    this.amountSortingDescending = true;
    this.seaBasedSortingDescending = true;
    this.desiredTermSortingDescending = true;
    this.firstnameSortingDescending = true;
    this.middlenameSortingDescending = true;
    this.lastnameSortingDescending = true;

    if (this.statusSortingDescending) {
      this.borrowersList = this.borrowersList.sort((a, b) =>
        a.Status.localeCompare(b.Status)
      );
      this.statusSortingDescending = false;
    } else {
      this.borrowersList = this.borrowersList.sort().reverse();
      this.statusSortingDescending = true;
    }
  }
  calculateDateDifference(dateToCalculate: string) {
    let borrowerBirthdateSplit = moment(dateToCalculate)
      .format('MM-DD-YYYY')
      .split('-');
    let currentDate = new Date();
    let currentDateConvertFromMoment = moment(currentDate).format('MM-DD-YYYY');
    let currentDateConvertedSplit = currentDateConvertFromMoment.split('-');
    var a = moment([
      parseInt(currentDateConvertedSplit[2]),
      parseInt(currentDateConvertedSplit[0]) - 1,
      parseInt(currentDateConvertedSplit[1]),
    ]);
    var b = moment([
      parseInt(borrowerBirthdateSplit[2]),
      parseInt(borrowerBirthdateSplit[0]) - 1,
      parseInt(borrowerBirthdateSplit[1]),
    ]);
    return a.diff(b, 'years').toString();
  }
  openXl(content: TemplateRef<any>, data: BorrowersInformation) {   
    this.loanAccountStatus = data.Status;
    this.loanIndex = data.Index.toString();
    this.dateApplied = data.DateApplied;
    this.agency = data.Agency;
    this.lastname = data.BorrowerLastName;
    this.firstname = data.BorrowerFirstName;
    this.lastname = data.BorrowerLastName;
    this.middlename = data.BorrowerMiddleName;
    this.loanamountrequested = data.AmountApplied;
    this.loanterm = data.DesiredTermmonths;
    this.loanPurpose = data.Purpose;
    this.homeaddress = `${
      data.BorrowerHomeAddressUnitStreetDoorBuilding == ''
        ? ''
        : `${data.BorrowerHomeAddressUnitStreetDoorBuilding},`
    } ${data.BorrowerHomeBarangay}, ${data.BorrowerHomeCity}, ${
      data.BorrowerHomeProvince
    }`;
    this.homelengthofstay = data.BorrowerHomeLengthofStaymonths;
    this.birthdate = moment(data.BorrowerBirthDate).format('MMM-DD-YYYY');
    this.age = this.calculateDateDifference(data.BorrowerBirthDate);
    this.sex = data.BorrowerGender;
    this.provincialaddress = `${
      data.BorrowerProvincialAddressUnitStreetDoorBuilding == ''
        ? ''
        : `${data.BorrowerProvincialAddressUnitStreetDoorBuilding},`
    } ${data.BorrowerProvincialBarangay}, ${data.BorrowerProvincialCity}, ${
      data.BorrowerProvincialProvince
    }`;
    this.provinciallengthofstay = data.BorrowerProvincialLengthofStaymonths;
    this.civilstatus = data.BorrowerCivilStatus;
    this.landlineNo = data.BorrowerLandlineNo;
    this.cellphoneNo = data.BorrowerMobileNo;
    this.homeOwnerhsipHowMuch =
      data.BorrowerHomeOwnershipHowMuchIfOwnedMortgageRented;
      this.monthlySalary =
      data.Based == 'Sea Based'
        ? data.SeabsedMonthlySalary.includes("$") ? data.SeabsedMonthlySalary : `$${data.SeabsedMonthlySalary}` 
        : data.LandbasedMonthlySalary;
    this.numberOfDependents = 0;
    
    if (data.Borrower1stDependentName != '') 
    {
      if (data.Borrower1stDependentName != 'N/A') 
      {
        this.numberOfDependents++;
      }
    }

    if (data.Borrower2ndDependentName != '') 
    {
      if (data.Borrower2ndDependentName != 'N/A') 
      {
        this.numberOfDependents++;
      }
    }
    if (data.Borrower3rdDependentName != '') 
    {
      if (data.Borrower3rdDependentName != 'N/A') 
      {
        this.numberOfDependents++;
      }
    }
    if (data.Borrower4thDependentName != '') 
    {
      if (data.Borrower4thDependentName != 'N/A') 
      {
        this.numberOfDependents++;
      }
    }
    
    this.yearsAsOFWSeaman =
      data.Based == 'Sea Based'
        ? parseInt(data.SeabasedYearsasSeafarer)
        : parseInt(data.LandbasedYearsasOFW);
    this.employer = data.LandbasedEmployer;
    this.position =
      data.Based == 'Sea Based'
        ? data.SeabasedPosition
        : data.LandbasedPosition;
    this.personalEmailAddress = data.BorrowerPersonalEmailAddress;
    this.spouseName = `${data.BorrowerSpouseLastName}, ${data.BorrowerSpouseFirstName}, ${data.BorrowerSpouseMiddleName}`;
    this.spouseAddress = `${
      data.BorrowerSpouseHomeAddressUnitStreetDoorBuilding == ''
        ? ''
        : `${data.BorrowerSpouseHomeAddressUnitStreetDoorBuilding},`
    } ${data.BorrowerSpouseBarangay}, ${data.BorrowerSpouseCity}, ${
      data.BorrowerSpouseHomeProvince
    }`;
    this.spouseBirthdate =
      data.BorrowerSpouseBirthDate != 'N/A'
        ? moment(data.BorrowerSpouseBirthDate).format('MMM-DD-YYYY')
        : data.BorrowerSpouseBirthDate;
    this.spouseAge =
      data.BorrowerSpouseBirthDate != 'N/A'
        ? this.calculateDateDifference(data.BorrowerSpouseBirthDate)
        : data.BorrowerSpouseBirthDate;
    this.spouseEmployerName = data.BorrowerSpouseEmployerName;
    this.spouseEmailAddress = data.BorrowerSpousePersonalEmailAddress;
    this.relativeName = data.Borrower1stRelativeName;
    this.relativeAddress = `${
      data.Borrower1stRelativeHomeAddressUnitStreetDoorBuilding == ''
        ? ''
        : `${data.Borrower1stRelativeHomeAddressUnitStreetDoorBuilding},`
    } ${data.Borrower1stRelativeHomeBarangay}, ${
      data.Borrower1stRelativeHomeCity
    }, ${data.Borrower1stRelativeHomeProvince}`;
    this.relativeRelationshipToApplicant =
      data.Borrower1stRelativeRelationshiptoApplicant;
    this.relativeCellphoneNumber = data.Borrower1stRelativeMobileNo;
    this.SSSNo = data.BorrowerSSSID;
    this.TINNo = data.BorrowerTINID;


  this.xlModal =  this.modalService.open(content, {
      size: 'xl',
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
      fullscreen: true,
    })
    
  }
  async refreshTable() {
    this.hideRefresh = false;
      await this.GetBorrowersLoanAccountInformation().then(async (el) => 
      {
        
    this.dateAppliedSortingDescending = true;
    this.amountSortingDescending = true;
    this.seaBasedSortingDescending = true;
    this.desiredTermSortingDescending = true;
    this.firstnameSortingDescending = true;
    this.middlenameSortingDescending = true;
    this.lastnameSortingDescending = true;
    this.statusSortingDescending = true;
   this.hideRefresh = true;
            var dateAndTimeToday = moment(new Date()).format(
              'MM-DD-YYYY hh:mm A'
            );
            localStorage.setItem(
              'lastrefreshed',
              JSON.stringify(dateAndTimeToday)
            );
            this.getDateLastUpdated();
      })
  }
  async login() {
    const response = await fetch('assets/users.json');

    let array = await response.json();
  }
  getDateLastUpdated() {
    var lastUpdatedFromLocalStorage = JSON.parse(
      localStorage.getItem('lastrefreshed') as any
    );

    if (lastUpdatedFromLocalStorage != null) {
      this.lastUpdated =
        'Last Refreshed : ' +
        JSON.stringify(lastUpdatedFromLocalStorage)
          .replace('"', '')
          .replace('"', '');
    }
  }
  closePopOver(p: NgbPopover) {
    setTimeout(() => {
      p.close();
    }, 500);
  }
  copyMessage(value: any) {
    this.unsecuredCopyToClipboard(value);
    // navigator.clipboard.writeText(value)
    // .then(el =>
    //   {
    //     //alert("Copied");

    //   })
    // .catch(e => console.log(e));
  }
  unsecuredCopyToClipboard(text: any) {
    const textArea = document.createElement('textarea');
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
  copyEvent(event: any) {
    var value = event.target.value;
    this.copyMessage(value.toUpperCase());
  }
  copyEventEmailNotUppercase(event: any) {
    var value = event.target.value;
    this.copyMessage(value.toLowerCase());
  }
  signOut() {
    this.auth.signOut();
    if (isPlatformBrowser(this.platformId)) 
    {
      sessionStorage.removeItem('user');
    }
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
  async GetBorrowersLoanAccountInformation() {
    const GetBorrowersLoanAccountInformationResponse = await fetch(
      `https://script.google.com/macros/s/AKfycbzdxuXkKlD4CBZohSTGyKN_lOrB5JroN3GcoLDY_LyvwpOhUcoXn-5bUVxnZIawJaW7/exec?action=getListformaindisplay`
    );

    var array = await GetBorrowersLoanAccountInformationResponse.json();

    array.map((el: BorrowersInformation) => {
      el.DateApplied = moment(el.DateApplied).format('MM-DD-YYYY hh:mm A');
      el.AmountAppliedConverted = parseFloat(
        el.AmountApplied.replace('₱', '').replace(',', '').replace(',', '')
      );
      el.Agency =
        el.Based == 'Sea Based' ? el.SeabasedAgency : el.LandbasedAgency;
    });
    this.borrowersList = array;
     if (this.multiplecolumnSearch != "")
     {
      this.borrowersList = this.borrowersList.filter
      (
        (
          f: BorrowersInformation
          ) => 
          
          f.DateApplied.toLocaleLowerCase().includes
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
       ||
       f.Status.toString().toLowerCase().includes
      (
      this.multiplecolumnSearch.toLowerCase()
      )
      )
    }
    else
    {
      this.borrowersList = array;
    }

  }
  UpdateLoanAccountStatus(statusValue: any) 
  {
    this.updatingStatusFunctionTriggered = true;
    const UpdateLoanAccountStatusResponse = fetch(
      `https://script.google.com/macros/s/AKfycbzdxuXkKlD4CBZohSTGyKN_lOrB5JroN3GcoLDY_LyvwpOhUcoXn-5bUVxnZIawJaW7/exec?action=updatestatusbyindexid&indexID=${this.loanIndex}&statusValue=${statusValue}`
    );
    UpdateLoanAccountStatusResponse.then(async (res) => {
      await res.json().then(async (el) => 
      {    
          await this.GetBorrowersLoanAccountInformation().then(async (el2) => 
          {
            await this.xlModal.dismiss('Cross click');
            this.updatingStatusFunctionTriggered = false;
          });
      });
    })
    .catch(async (err) => {
      console.log("the error", err)
      alert('Error Updating');
    });
  }
  openConfirmation(content: any) 
  {
    this.modalService.open(content, {
      size: 'md',
      scrollable: true,
      backdrop: 'static',
      keyboard: false
    })
  }
  openConfirmationModal(statusValue: any, confirmationmodal: any) 
  {
    this.currentstatusValue = ''
    this.currentstatusValue = statusValue;
    var borrowerFullName = `${this.lastname}, ${this.firstname}, ${this.middlename}`
    this.confirmationMessage = ''
    this.confirmationMessage = `Are you sure you want to marked as ${statusValue.toLowerCase()} the loan application of ${borrowerFullName}`
    this.openConfirmation(confirmationmodal);

  }


  updateLoanStatus(statusvalue: any, confirmationModal: any) 
  {
    confirmationModal.dismiss('cancel click');
    this.UpdateLoanAccountStatus(statusvalue);

  }
  gotoAddUser() 
  {

    this.router.navigate(['/adduser'])
  }


}
