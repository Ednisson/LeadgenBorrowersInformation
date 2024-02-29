import { Routes } from '@angular/router';
import { BorrowerslistComponent  } from './borrower/borrowerslist/borrowerslist.component'
import { LoginComponent } from './credentials/login/login.component';
import { authguardGuard } from './Guard/authguard.guard';
import { canactivateloggedinGuard } from './Guard/canactivateloggedin.guard';
export const routes: Routes = 
[
    {
        path: '',
        pathMatch: "full",
        redirectTo: 'borrowerslist'
    },
    {
        path: 'borrowerslist',
        component: BorrowerslistComponent,
         canActivate: [authguardGuard]   
    },
    {

        path: 'login',
        component: LoginComponent,
        canActivate: [canactivateloggedinGuard]
    }
];
