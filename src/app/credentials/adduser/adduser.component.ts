import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})
export class AdduserComponent implements OnInit {
public email: string = ''
public password: string = ''
public position: string = ''
public currentUserLoggedInRole: string = ''
  constructor(private auth: AuthService, private router: Router) 
  {
    this.currentUserLoggedInRole = this.auth.getCurrentUserLoggedinSessionStorageObject().displayName;
  
    if (this.currentUserLoggedInRole != 'admin') 
    {
      this.router.navigate(['/borrowerslist'])
      setTimeout(() => {
          window.location.reload()
      }, 0);
    } 
  }


  ngOnInit(): void 
  {
    
  }

  addUser() 
  {
    if (this.position == '') 
    {
      alert("Position must have a value")
    }
    else 
    {
      var params = 
      {
        email: this.email,
        password: this.password
      }
      this.auth.signUp(params).subscribe
      ({
        next: async (res) => 
        {
          updateProfile(res.user, {displayName: this.position})
          alert("Added successfully!")
          this.position = ''
          this.email = ''
          this.password = ''
          // this.auth.setUserToSessionStorage(res.user);
        },
        error: async (error) => 
        {
          alert(error);
        }
      })
  
    }
  }

  goToBorrowersList() 
  {
    this.router.navigate(['/borrowerslist']);
    setTimeout(() => {
        window.location.reload()
    }, 0);
  }

}
