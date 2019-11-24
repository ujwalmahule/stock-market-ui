import { LoginFormModel } from './../../model/login-form-model';
import { BodyComponent } from './../../interfaces/body-component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, BodyComponent {

  loginForm: FormGroup;

  loading = false;
  submitted = false;
  loginError = false;
  errorMessage: String;

  constructor(private http: HttpClient, private authService : AuthenticationService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  login(data : LoginFormModel) {
    this.loading = true;
    this.authService.login(data.username, data.password)
      .pipe(first())
      .subscribe(
        data => {
          //this.router.navigate([this.returnUrl]);
          console.log("login success");
        },
        error => {
            this.loginError = true;
            if(error.status == 401) {
              this.errorMessage = "Invalid username or password";
            } else {
              this.errorMessage = "Error occured while signing in, please try again after some time.";
            }
            this.loading = false;
        }
      );
  }

}
