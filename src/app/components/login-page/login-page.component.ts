import { BodyComponent } from './../../interfaces/body-component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, BodyComponent {

  loginForm: FormGroup;

  loading = false;
  submitted = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  login() {
    this.loading = true;
    let api = this.http.get("http://localhost:8181/user-service",{responseType: 'text'});
    api.subscribe((response) => {
      console.log("got response from api" + response);
      this.loading = false;
    });
  }

}
