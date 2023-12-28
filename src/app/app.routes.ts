import { Routes } from '@angular/router';
import { BorrowerslistComponent  } from './borrower/borrowerslist/borrowerslist.component'
export const routes: Routes = 
[
    {
        path: '',
        pathMatch: "full",
        redirectTo: 'borrowerslist'
    },
    {
        path: 'borrowerslist',
        component: BorrowerslistComponent   
    }
];
