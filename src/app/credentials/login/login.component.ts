import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

public email: string = "";
public password: string = "";
public hideLoginCredentialPage: boolean = false;
public emailForDisplay: string = ""
  constructor(private authService: AuthService, private router: Router, private applicationRef: ApplicationRef, private zone: NgZone) 
  {


this.router.events.subscribe(() => 
{
  this.zone.run(() => 
  {
    setTimeout(() => {
      this.applicationRef.tick();
      var userSession = JSON.parse(sessionStorage.getItem('user') as any)
      if (userSession != "" && userSession != null) 
      {
        this.hideLoginCredentialPage = true;
        this.emailForDisplay = userSession
      }
      else 
      {
        this.hideLoginCredentialPage = false;
      }
      
    }, 0);
  })
})


  }
  ngOnInit(): void 
  {
    // setInterval(() => 
    // {
    //   var userSession = JSON.parse(sessionStorage.getItem('user') as any)
    //   if (userSession != "" && userSession != null) 
    //   {
    //     this.hideLoginCredentialPage = true;
    //   }
    //   else 
    //   {
    //     this.hideLoginCredentialPage = false;
    //   }
    // }, 0)

// this.router.events.subscribe(() => 
// {
//   this.zone.run(() => 
//   {
//     setTimeout(() => {
//       this.applicationRef.tick();
//       var userSession = JSON.parse(sessionStorage.getItem('user') as any)
//       if (userSession != "") 
//       {
//         this.hideLoginCredentialPage = true;
//       }
//       else 
//       {
//         this.hideLoginCredentialPage = false;
//       }
      
//     }, 0);
//   })




  }


  SignIn() 
  {
    this.authService.signIn({email: this.email, password: this.password})
    .subscribe
    ({
      next: async (success) => 
      {
        sessionStorage.setItem('user', JSON.stringify(success.user.email));
        this.router.navigateByUrl("/borrowerslist");

      },
      error: async error => 
      {
        alert(error.message);
      }

    })

  }

}