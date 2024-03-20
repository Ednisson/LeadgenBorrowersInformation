import { ApplicationRef, Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { isPlatformBrowser } from '@angular/common';


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
  constructor(private authService: AuthService, private router: Router, private applicationRef: ApplicationRef, private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object) 
  {


if (isPlatformBrowser(this.platformId)){

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

  }
  ngOnInit(): void 
  {

  }


  SignIn() 
  {
    this.authService.signIn({email: this.email, password: this.password})
    .subscribe
    ({
      next: async (success) => 
      {
        if (isPlatformBrowser(this.platformId)) 
        {
          this.authService.setUserToSessionStorage(success.user)
        }
        if (success.user.displayName == 'admin') 
        {
          this.router.navigate(['/adduser'])  
        }
        else 
        {
          this.router.navigate(['/borrowerslist']);
        }
        
      },
      error: async error => 
      {
        alert(error.message);
      }

    })

  }

}
