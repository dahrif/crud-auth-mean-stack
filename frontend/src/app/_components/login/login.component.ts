import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: any;
  
  form: any = {
    username: null,
    email: null,
    password: null
  };

  // isSuccessful = false;
  // isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router : Router) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }


  onSubmit(): void {
    const { username, email, password } = this.form;


    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        // window.location.reload();
        this.router.navigate(['/user'])
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );

    // this.authService.register(username, email, password)
    // .subscribe(
    //   data => {
    //     console.log(data);
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    //   },
    //   err => {
    //     this.errorMessage = err.error.message;
    //     this.isSignUpFailed = true;        
    //   }
    // );

  }

  
}
